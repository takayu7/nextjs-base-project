"use client";
import React from "react";

import { BadgeJapaneseYen } from "lucide-react";

type FormFieldProps = {
  varient?: "expense" | "income";
};

export const FormField: React.FC<FormFieldProps> = ({
  varient = "expense",
}) => {
  return (
    <>
      <ul className="space-y-10 pt-8">
        {/* 金額 */}
        <li className="flex flex-row items-center justify-between border-b-2 border-gray-300 pb-5">
          <div className="flex flex-row">
            <BadgeJapaneseYen width={24} height={24} />
            <label>Amount</label>
          </div>
          <input
            type="number"
            className={
              varient === "expense"
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[28px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[28px]"
            }
          />
        </li>

        {/* カテゴリ */}
        <li className="flex flex-row items-center justify-between">
          <label>Category</label>
          <select
            className={
              varient === "expense"
                ? "select rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[28px]"
                : "select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[28px]"
            }
          />
        </li>

        {/* 日付 */}
        <li className="flex flex-row items-center justify-between">
          <label>Date</label>
          <input
            type="date"
            className={
              varient === "expense"
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[28px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[28px]"
            }
          />
        </li>

        {/* メモ */}
        <li className="flex flex-row justify-between">
          <label>Memo</label>
          <textarea
            className={
              varient === "expense"
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[86px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[86px]"
            }
          />
        </li>
      </ul>
    </>
  );
};
