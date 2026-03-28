// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths that require authentication
const protectedPaths = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the request is for a protected path
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // Example: check if user is logged in via cookie
    const token = req.cookies.get("authToken"); // adjust your cookie name

    if (!token) {
      // Redirect to login page
      const loginUrl = new URL("/auth/admin-login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Apply middleware only to protected paths
export const config = {
  matcher: ["/admin/:path*"], // match /admin and all subroutes
};