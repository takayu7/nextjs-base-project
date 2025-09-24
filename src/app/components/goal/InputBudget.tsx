"use client";
import { useState } from "react";
import { InputField } from "@/app/components/molecules/InputField";
import { BudgetDialog } from "@/app/components/goal/BudgetDialog";
import { Dialog } from "@/components/ui/dialog";

export const InputBudget = () => {
  const [yearMonth, setYearMonth] = useState("");
  const [budget, setBudget] = useState(0);

  const yearMonthTestData = [
    { id: 1, year_month: "2025-09" },
    { id: 2, year_month: "2025-10" },
    { id: 3, year_month: "2025-11" },
    { id: 4, year_month: "2025-12" },
    { id: 5, year_month: "2026-01" },
  ];
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
            <select
              name="year_month"
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
              className="select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[180px] h-[32px]"
            >
              {yearMonthTestData.map((i) => (
              
                <option key={i.id} value={i.id}>
                
                  {i.year_month}
                </option>
              ))}
            </select>
            {/* 予算入力 */}
            <InputField
              id="budget"
              type="text"
              placeholder="budget"
              varient="box"
              value={budget}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setBudget(e.target.value)}
            />
            <Dialog>
              <BudgetDialog yearMonth={yearMonth} budget={budget} />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};
