import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getRoleFromToken, isTokenExpired, normalizeRole } from "@/lib/auth";

const ADMIN_PATH = "/admin";
const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_AUTH_COOKIE = "adminAuthToken";
const ADMIN_ROLE_COOKIE = "adminAuthRole";

function redirectToAdminLogin(req: NextRequest) {
  const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, req.url));
  response.cookies.set(ADMIN_AUTH_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  response.cookies.set(ADMIN_ROLE_COOKIE, "", {
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(ADMIN_PATH)) {
    return NextResponse.next();
  }

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_AUTH_COOKIE)?.value;

  if (!token || isTokenExpired(token)) {
    return redirectToAdminLogin(req);
  }

  const role = normalizeRole(getRoleFromToken(token));
  if (role !== "admin" && role !== "super_admin") {
    return redirectToAdminLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};