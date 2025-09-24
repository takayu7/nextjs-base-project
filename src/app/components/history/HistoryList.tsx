"use client";
import { categoryTestData } from "@/app/components/home/CategoryDetails";
import { jpMoneyChange, categoryIcon } from "@/app/lib/utils";
import { PiggyBank } from "lucide-react";

export const HistoryList = () => {
  
  const expensesTestData = [
    {
      expense_id: 1,
      user_id: 1,
      expense_category_id: 3,
      money: 1500,
      date: "2025-09-03",
      memo: "",
    },
    {
      expense_id: 2,
      user_id: 1,
      expense_category_id: 2,
      money: 2500,
      date: "2025-09-04",
      memo: "Live ticket and goods",
    },
    {
      expense_id: 3,
      user_id: 1,
      expense_category_id: 4,
      money: 5000,
      date: "2025-09-09",
      memo: "",
    },
  ];

  const incomesTestData = [
    {
      income_id: 1,
      user_id: 1,
      expense_category_id: 8,
      money: 2000,
      date: "2025-09-07",
      memo: "Goods sold",
    },
    {
      income_id: 2,
      user_id: 1,
      expense_category_id: 8,
      money: 5000,
      date: "2025-09-09",
      memo: "",
    },
  ];

  const allHistory = [
    ...expensesTestData.map((i) => ({ ...i, type: "expense" })),
    ...incomesTestData.map((i) => ({ ...i, type: "income" })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // 日付降順

  const getCategoryName = (id: number) =>
    categoryTestData.find((i) => i.id === id)?.category;
  const getCategoryColor = (id: number) =>
    categoryTestData.find((i) => i.id === id)?.color;

  return (
    <div className="pt-10">
      <div className="bg-pink-50 border border-pink-200 px-2 py-7 shadow-sm w-[318px] flex flex-col gap-1.5">
        {allHistory.map((i) => (
          <ul
            key={`${i.type}-${i.expense_id ?? i.income_id}`}
            className="flex flex-col bg-white px-3 py-3 border border-dashed border-pink-200 rounded-lg"
          >
            <div className="flex justify-between">
              <li className="font-semibold text-gray-900 text-lg">{i.date}</li>

              <div className="flex flex-col items-end">
                <li
                  className={`${
                    i.type === "expense" ? "text-[#1464F6]" : "text-[#E93578]"
                  } text-[17px]`}
                >
                  {i.type === "expense"
                    ? `ー${jpMoneyChange(i.money)}`
                    : `＋${jpMoneyChange(i.money)}`}
                </li>

                <div className="flex flex-row items-center">
                  <li className="pr-1">
                    {categoryIcon(
                      i.expense_category_id,
                      getCategoryColor(i.expense_category_id),
                      18
                    )}
                  </li>
                  <li
                    style={{ color: getCategoryColor(i.expense_category_id) }}
                    className="text-[15px]"
                  >
                    {getCategoryName(i.expense_category_id)}
                  </li>
                </div>
              </div>
            </div>

            {i.memo && (
              <div className="flex flex-row justify-between ">
                <PiggyBank className="w-[40px] h-[40px] text-[#F6A2BF]" />
                <li className="relative w-[217px] h-[40px] rounded-lg bg-[#C0C0C0] text-sm px-4 py-1 text-white flex justify-center items-center">
                  {i.memo}
                  <div className="absolute z-10 left-[15px]">
                    <div className="rounded-sm before:absolute before:-top-2 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:bg-[#C0C0C0]" />
                  </div>
                </li>
              </div>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};
