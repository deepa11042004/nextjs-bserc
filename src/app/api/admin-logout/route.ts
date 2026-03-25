// /app/api/admin-logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // Later you can clear cookies/session here

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}