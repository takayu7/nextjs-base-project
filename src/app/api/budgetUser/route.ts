import { NextResponse, NextRequest } from "next/server";
import { addBudgetDatas, updateBudgetDatas } from "@/app/lib/api";

//登録
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await addBudgetDatas(body);
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
    const result = await updateBudgetDatas(body);
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
