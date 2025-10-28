import { getRecordData } from "@/app/lib/api";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  const { userId } = await context.params;
  const data = await getRecordData(userId);
  return NextResponse.json(data);
}