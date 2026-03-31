import type { AuthRole, AuthUser } from "@/types/auth";

type JwtPayload = Record<string, unknown> & {
  exp?: number;
  role?: string;
  user_role?: string;
  user?: {
    role?: string;
  };
};

function decodeBase64Url(value: string): string | null {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

  try {
    if (typeof globalThis.atob === "function") {
      return globalThis.atob(padded);
    }
  } catch {
    // fall through to Buffer fallback
  }

  if (typeof globalThis.Buffer === "function") {
    try {
      return Buffer.from(padded, "base64").toString("utf-8");
    } catch {
      return null;
    }
  }

  return null;
}

export function normalizeRole(input: unknown): AuthRole | null {
  if (typeof input !== "string") {
    return null;
  }

  const normalized = input.trim().toLowerCase().replace(/[\s-]/g, "_");

  if (normalized === "admin") {
    return "admin";
  }

  if (normalized === "super_admin" || normalized === "superadmin") {
    return "super_admin";
  }

  if (normalized === "user" || normalized === "student") {
    return "user";
  }

  return null;
}

export function isAdminRole(role: unknown): role is "admin" | "super_admin" {
  const normalized = normalizeRole(role);
  return normalized === "admin" || normalized === "super_admin";
}

export function parseJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) {
      return null;
    }

    const decoded = decodeBase64Url(parts[1]);
    if (!decoded) {
      return null;
    }

    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

export function getTokenExpiryMs(token: string): number | null {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return null;
  }

  return payload.exp * 1000;
}

export function isTokenExpired(token: string): boolean {
  if (!token || typeof token !== "string") {
    return true;
  }

  const expiryMs = getTokenExpiryMs(token);
  if (expiryMs === null) {
    // Treat malformed tokens or tokens without exp as invalid sessions.
    return true;
  }

  return Date.now() >= expiryMs;
}

export function getRoleFromToken(token: string): AuthRole | null {
  const payload = parseJwtPayload(token);
  if (!payload) {
    return null;
  }

  const roleFromUser =
    typeof payload.user === "object" && payload.user !== null
      ? (payload.user as { role?: unknown }).role
      : undefined;

  return (
    normalizeRole(payload.role) ||
    normalizeRole(payload.user_role) ||
    normalizeRole(roleFromUser)
  );
}

export function normalizeUser(
  user: Partial<AuthUser> | null | undefined,
  fallback?: Partial<AuthUser>,
): AuthUser {
  const source = {
    ...(fallback ?? {}),
    ...(user ?? {}),
  };

  const email = typeof source.email === "string" ? source.email.trim() : "";
  const fullName =
    typeof source.full_name === "string" ? source.full_name.trim() : "";
  const name = typeof source.name === "string" ? source.name.trim() : "";

  const derivedName =
    fullName || name || (email ? email.split("@")[0] : "Authenticated User");

  return {
    ...source,
    email: email || undefined,
    full_name: fullName || derivedName,
    name: derivedName,
    role: typeof source.role === "string" ? source.role : undefined,
  };
}
