"use client";
import { useState } from "react";
import { InputField } from "@/app/components/molecules/InputField";
import { BudgetDialog } from "@/app/components/goal/BudgetDialog";
import { Dialog } from "@/components/ui/dialog";
import { Budget } from "@/app/types/type";

export const InputBudget = () => {
  const [yearMonth, setYearMonth] = useState("");
  const [budget, setBudget] = useState(0);
  const [budgetData, setBudgetData] = useState<Budget|null>(null);
  const userId = 1;

  // DBからデータ取得

  const handleSave = async () => {
    // if (!userId) return;
    // setLoading(true);
    try {
      const res = await fetch(`/api/budget/${userId}`);
      const data = await res.json();
      console.log("データ:", data);
      setBudgetData(data[0]);
      
    } catch (error) {
      console.error("失敗:", error);
    }
  };

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
              value={yearMonth}
              onChange={(e) => setYearMonth(e.target.value)}
              className="select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[180px] h-[32px]"
            />
            {/* {yearMonthTestData.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.year_month}
                </option>
              ))} */}
            {/* </select> */}
            {/* 予算入力 */}
            <InputField
              id="budget"
              type="text"
              placeholder="budget"
              varient="box"
              value={budget}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setBudget(Number(e.target.value))
              }
            />
            <Dialog>
              <BudgetDialog
                yearMonth={yearMonth}
                budget={budget}
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
