import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/app/lib/api";

export async function POST(request: NextRequest) {
  try {
    const { address, password } = await request.json();
    const user = await loginUser(address, password);

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({
      userId: user.id,
      name: user.name,
      address: user.address,
      birthday: user.birthday,
    });
  } catch (error) {
    console.error("POST /api/login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
