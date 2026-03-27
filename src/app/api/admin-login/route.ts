// src/app/api/admin-login/route.ts
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${process.env.AUTH_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Read raw response first (important)
    const raw = await response.text();
    console.log("BACKEND RAW:", raw);

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { success: false, message: "Backend not returning JSON" },
        { status: 500 }
      );
    }

    // Validate response
    if (!response.ok || !data?.token) {
      return NextResponse.json(
        { success: false, message: data?.message || "Login failed" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return res;

  } catch (error) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}