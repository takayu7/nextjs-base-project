import { NextResponse } from "next/server";
import { getCategoryData } from "@/app/lib/api";

export async function GET() {
  try {
    const users = await getCategoryData();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
