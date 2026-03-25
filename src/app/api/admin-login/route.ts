// /app/api/admin-login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin_email = process.env.ADMIN_ID;
  const admin_password = process.env.ADMIN_PASSWORD;

  if (email === admin_email && password === admin_password) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}