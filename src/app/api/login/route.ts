import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/app/lib/api";

export async function POST(request: NextRequest) {
  try {
    const { address, password } = await request.json();
    const user = await loginUser(address, password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("POST /api/login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
