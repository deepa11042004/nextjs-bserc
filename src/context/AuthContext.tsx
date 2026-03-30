"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Role = "student" | "admin" | null;

type User = {
  name: string;
  email: string;
} | null;

interface AuthContextType {
  token: string | null;
  role: Role;
  user: User; // ✅ add this
  isLoggedIn: boolean;
  login: (token: string, role: Role, user: User) => void; // ✅ update
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>(null);

  // ✅ Load from localStorage on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role") as Role;
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedRole && storedUser) {
      setToken(storedToken);
      setRole(storedRole);
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Login
  const login = (token: string, role: Role, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role || "");
    localStorage.setItem("user", JSON.stringify(user)); // ✅ correct user

    setToken(token);
    setRole(role);
    setUser(user); // ✅ set correct user
    setIsLoggedIn(true);
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); // ✅ remove user

    setToken(null);
    setRole(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, role, user, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
