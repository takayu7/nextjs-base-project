import { NextResponse, NextRequest } from "next/server";
import { getCategoryData, deleteCategoryData } from "@/app/lib/api";

export async function GET() {
  try {
    const categories = await getCategoryData();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await deleteCategoryData(body.id);
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