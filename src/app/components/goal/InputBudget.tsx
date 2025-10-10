"use client";
import { useState, useTransition } from "react";
import { InputField } from "@/app/components/molecules/InputField";
import { BudgetDialog } from "@/app/components/goal/BudgetDialog";
import { Dialog } from "@/components/ui/dialog";
import { Budget } from "@/app/types/type";

export const InputBudget = () => {
  const [yearMonth, setYearMonth] = useState("");
  const [budgetMoney, setBudgetMoney] = useState(0);
  const [budgetData, setBudgetData] = useState<{
    money: number;
    yearMonth: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  // const userId = 1;

  // DBからデータ取得

  // const handleSave = async () => {
  //   try {
  //     const res = await fetch(`/api/budget/${userId}`);
  //     const data = await res.json();
  //     console.log("データ:", data);
  //     setBudgetData(data[0]);

  //   } catch (error) {
  //     console.error("失敗:", error);
  //   }
  // };

  const onSave = async (budget: Budget) => {
    console.log("budget:", budget);
    const res = await fetch("/api/budgetUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
      cache: "no-store",
    });
    const data = await res.json();
    console.log("Response text:", data);
    setBudgetData(data);
  };

  const handleSave = () => {
    const budgetData = {
      userId: 1,
      yearMonth: yearMonth,
      money: budgetMoney,
    };
    startTransition(() => {
      onSave(budgetData);
    });
  };

  //現在の年月を取得
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const formatted=(`${year}-${month}`);

  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center pt-5 flex-col items-center">
          <h1 className="text-maincolor text-2xl font-bold font-mono">
            Monthly Budget
          </h1>
          <div className="pt-25 flex flex-col items-center gap-10">
            <p>How much is your budget for this month?</p>
            {/* 月選択 */}
            <input
              type="month"
              name="year_month"
              value={yearMonth||formatted}
              onChange={(e) => setYearMonth(e.target.value)}
              className="select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[180px] h-[32px]"
            />

            {/* 予算入力 */}
            <InputField
              id="budget"
              type="number"
              placeholder="budget"
              varient="box"
              value={budgetMoney}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBudgetMoney(Number(e.target.value))
              }
            />
            {/* Saveボタン */}
            <Dialog>
              <BudgetDialog
                yearMonth={yearMonth}
                budgetMoney={budgetMoney}
                budgetData={budgetData}
                onSave={handleSave}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};
