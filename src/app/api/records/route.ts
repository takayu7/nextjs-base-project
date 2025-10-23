import { NextResponse, NextRequest } from "next/server";
import { addRecorData, updateRecorData } from "@/app/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = {
      ...body,
      date: new Date(body.date),
    };
    const result = await addRecorData(record);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown Error:", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}

//更新
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const record = {
      ...body,
      date: new Date(body.date),
    };
    const result = await updateRecorData(record);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unknown Error:", error);
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
