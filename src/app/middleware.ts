// src/middleware.ts

import { NextResponse,NextRequest } from "next/server";
 

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && (!token || token === "undefined")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};