import { NextResponse, NextRequest } from "next/server";
import { getBudgetDataByMonth } from "@/app/lib/api";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ targetDate: string }> }
) {
  try {
    const { targetDate } = await context.params;
    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("userId"));

    const budgetDate = await getBudgetDataByMonth(targetDate, userId);
    return NextResponse.json(budgetDate);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database Error:", error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    throw new Error("Failed to fetch budget monthly data.");
  }
}