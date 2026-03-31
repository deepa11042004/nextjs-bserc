export type AuthRole = "user" | "admin" | "super_admin";

export interface AuthUser {
  id?: string | number;
  full_name?: string;
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export interface AuthResponse {
  token?: string;
  user?: AuthUser;
  message?: string;
  [key: string]: unknown;
}
