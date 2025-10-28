import { getRecordData } from "@/app/lib/api";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const data = await getRecordData(userId);
  return NextResponse.json(data);
}