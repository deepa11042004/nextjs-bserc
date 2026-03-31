"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  getRoleFromToken,
  getTokenExpiryMs,
  isAdminRole,
  isTokenExpired,
  normalizeRole,
  normalizeUser,
} from "@/lib/auth";
import type { AuthRole, AuthUser } from "@/types/auth";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24;

type LoginRole = AuthRole | "student" | string | null;
type AuthScope = "user" | "admin";

interface LoginOptions {
  scope?: AuthScope;
}

interface LogoutOptions {
  scope?: AuthScope;
}

interface SessionState {
  token: string | null;
  role: AuthRole | null;
  user: AuthUser | null;
}

const EMPTY_SESSION: SessionState = {
  token: null,
  role: null,
  user: null,
};

const LEGACY_SESSION_KEYS = {
  token: "token",
  role: "role",
  user: "user",
  tokenCookie: "authToken",
  roleCookie: "authRole",
} as const;

const SESSION_CONFIG: Record<
  AuthScope,
  {
    tokenKey: string;
    roleKey: string;
    userKey: string;
    tokenCookie: string;
    roleCookie: string;
    loginPath: string;
  }
> = {
  user: {
    tokenKey: "userToken",
    roleKey: "userRole",
    userKey: "userProfile",
    tokenCookie: "userAuthToken",
    roleCookie: "userAuthRole",
    loginPath: "/login",
  },
  admin: {
    tokenKey: "adminToken",
    roleKey: "adminRole",
    userKey: "adminProfile",
    tokenCookie: "adminAuthToken",
    roleCookie: "adminAuthRole",
    loginPath: "/admin/login",
  },
};

interface AuthContextType {
  token: string | null;
  role: AuthRole | null;
  user: AuthUser | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (
    token: string,
    role?: LoginRole,
    user?: Partial<AuthUser> | null,
    options?: LoginOptions,
  ) => void;
  logout: (redirectTo?: string, options?: LogoutOptions) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function getScopeFromPathname(pathname: string | null): AuthScope {
  return pathname?.startsWith("/admin") ? "admin" : "user";
}

function setCookie(
  name: string,
  value: string,
  maxAgeSeconds = COOKIE_MAX_AGE_SECONDS,
) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

function safeParseUser(rawValue: string | null): AuthUser | null {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<AuthUser>;
    return normalizeUser(parsed);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeScope = useMemo(() => getScopeFromPathname(pathname), [pathname]);

  const [userSession, setUserSession] = useState<SessionState>(EMPTY_SESSION);
  const [adminSession, setAdminSession] = useState<SessionState>(EMPTY_SESSION);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasMigratedLegacySession = useRef(false);

  const setSessionState = useCallback(
    (scope: AuthScope, nextSession: SessionState) => {
      const normalizedSession: SessionState = {
        token: nextSession.token,
        role: nextSession.role,
        user: nextSession.user,
      };

      if (scope === "admin") {
        setAdminSession(normalizedSession);
        return;
      }

      setUserSession(normalizedSession);
    },
    [],
  );

  const clearSession = useCallback(
    (scope: AuthScope, options?: { syncState?: boolean }) => {
      const config = SESSION_CONFIG[scope];

      if (typeof window !== "undefined") {
        localStorage.removeItem(config.tokenKey);
        localStorage.removeItem(config.roleKey);
        localStorage.removeItem(config.userKey);
      }

      clearCookie(config.tokenCookie);
      clearCookie(config.roleCookie);

      if (options?.syncState !== false) {
        setSessionState(scope, EMPTY_SESSION);
      }
    },
    [setSessionState],
  );

  const persistSession = useCallback(
    (
      scope: AuthScope,
      nextToken: string,
      nextRole: AuthRole,
      nextUser: AuthUser,
      options?: { syncState?: boolean },
    ) => {
      const config = SESSION_CONFIG[scope];

      if (typeof window !== "undefined") {
        localStorage.setItem(config.tokenKey, nextToken);
        localStorage.setItem(config.roleKey, nextRole);
        localStorage.setItem(config.userKey, JSON.stringify(nextUser));
      }

      setCookie(config.tokenCookie, nextToken);
      setCookie(config.roleCookie, nextRole);

      if (options?.syncState !== false) {
        setSessionState(scope, {
          token: nextToken,
          role: nextRole,
          user: nextUser,
        });
      }
    },
    [setSessionState],
  );

  const readSession = useCallback(
    (scope: AuthScope): SessionState => {
      if (typeof window === "undefined") {
        return EMPTY_SESSION;
      }

      const config = SESSION_CONFIG[scope];
      const storedToken = localStorage.getItem(config.tokenKey);
      const storedRole = localStorage.getItem(config.roleKey);
      const storedUser = safeParseUser(localStorage.getItem(config.userKey));

      if (!storedToken) {
        return EMPTY_SESSION;
      }

      if (isTokenExpired(storedToken)) {
        clearSession(scope, { syncState: false });
        return EMPTY_SESSION;
      }

      const defaultRole: AuthRole = scope === "admin" ? "admin" : "user";
      const resolvedRole =
        normalizeRole(storedRole) ||
        normalizeRole(storedUser?.role) ||
        getRoleFromToken(storedToken) ||
        defaultRole;

      if (scope === "admin" && !isAdminRole(resolvedRole)) {
        clearSession(scope, { syncState: false });
        return EMPTY_SESSION;
      }

      if (scope === "user" && isAdminRole(resolvedRole)) {
        clearSession(scope, { syncState: false });
        return EMPTY_SESSION;
      }

      const resolvedUser = normalizeUser(storedUser, {
        role: resolvedRole,
      });

      return {
        token: storedToken,
        role: resolvedRole,
        user: resolvedUser,
      };
    },
    [clearSession],
  );

  const migrateLegacySession = useCallback(() => {
    if (typeof window !== "undefined") {
      const legacyToken = localStorage.getItem(LEGACY_SESSION_KEYS.token);
      const legacyRole = localStorage.getItem(LEGACY_SESSION_KEYS.role);
      const legacyUser = safeParseUser(
        localStorage.getItem(LEGACY_SESSION_KEYS.user),
      );

      localStorage.removeItem(LEGACY_SESSION_KEYS.token);
      localStorage.removeItem(LEGACY_SESSION_KEYS.role);
      localStorage.removeItem(LEGACY_SESSION_KEYS.user);

      clearCookie(LEGACY_SESSION_KEYS.tokenCookie);
      clearCookie(LEGACY_SESSION_KEYS.roleCookie);

      if (!legacyToken || isTokenExpired(legacyToken)) {
        return;
      }

      const resolvedRole =
        normalizeRole(legacyRole) ||
        normalizeRole(legacyUser?.role) ||
        getRoleFromToken(legacyToken) ||
        "user";

      const scope: AuthScope = isAdminRole(resolvedRole) ? "admin" : "user";
      const resolvedUser = normalizeUser(legacyUser, { role: resolvedRole });

      persistSession(scope, legacyToken, resolvedRole, resolvedUser, {
        syncState: false,
      });
    }
  }, [persistSession]);

  const logout = useCallback(
    (redirectTo?: string, options?: LogoutOptions) => {
      const scope = options?.scope ?? activeScope;

      clearSession(scope);

      if (redirectTo && typeof window !== "undefined") {
        window.location.assign(redirectTo);
      }
    },
    [activeScope, clearSession],
  );

  const login = useCallback(
    (
      nextToken: string,
      incomingRole?: LoginRole,
      incomingUser?: Partial<AuthUser> | null,
      options?: LoginOptions,
    ) => {
      const requestedScope = options?.scope;
      const fallbackScope = requestedScope ?? activeScope;

      if (!nextToken || isTokenExpired(nextToken)) {
        logout(SESSION_CONFIG[fallbackScope].loginPath, {
          scope: fallbackScope,
        });
        return;
      }

      const normalizedUser = normalizeUser(incomingUser);
      const resolvedRole =
        normalizeRole(incomingRole) ||
        normalizeRole(normalizedUser.role) ||
        getRoleFromToken(nextToken) ||
        "user";

      const scope: AuthScope =
        requestedScope ?? (isAdminRole(resolvedRole) ? "admin" : "user");

      if (scope === "admin" && !isAdminRole(resolvedRole)) {
        logout(SESSION_CONFIG.admin.loginPath, { scope: "admin" });
        return;
      }

      if (scope === "user" && isAdminRole(resolvedRole)) {
        logout(SESSION_CONFIG.user.loginPath, { scope: "user" });
        return;
      }

      const resolvedUser = normalizeUser(normalizedUser, {
        role: resolvedRole,
      });

      persistSession(scope, nextToken, resolvedRole, resolvedUser);
    },
    [activeScope, logout, persistSession],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsHydrated(true);
      return;
    }

    if (!hasMigratedLegacySession.current) {
      migrateLegacySession();
      hasMigratedLegacySession.current = true;
    }

    if (activeScope === "user") {
      clearSession("admin", { syncState: false });
      setSessionState("admin", EMPTY_SESSION);
    }

    const activeSession = readSession(activeScope);
    setSessionState(activeScope, activeSession);
    setIsHydrated(true);
  }, [activeScope, clearSession, migrateLegacySession, readSession, setSessionState]);

  const activeSession = activeScope === "admin" ? adminSession : userSession;

  useEffect(() => {
    if (!activeSession.token) {
      return;
    }

    const expiryMs = getTokenExpiryMs(activeSession.token);
    const loginPath = SESSION_CONFIG[activeScope].loginPath;

    if (!expiryMs) {
      logout(loginPath, { scope: activeScope });
      return;
    }

    const remainingMs = expiryMs - Date.now();
    if (remainingMs <= 0) {
      logout(loginPath, { scope: activeScope });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      logout(loginPath, { scope: activeScope });
    }, remainingMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeScope, activeSession.token, logout]);

  const value = useMemo<AuthContextType>(
    () => ({
      token: activeSession.token,
      role: activeSession.role,
      user: activeSession.user,
      isLoggedIn: Boolean(activeSession.token),
      isHydrated,
      login,
      logout,
    }),
    [activeSession, isHydrated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

