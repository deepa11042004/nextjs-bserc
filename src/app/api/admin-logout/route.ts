// src/app/api/admin-logout/route.ts
 
import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("admin_token", "", {
    path: "/",
    maxAge: 0,
  });

  return res;
}