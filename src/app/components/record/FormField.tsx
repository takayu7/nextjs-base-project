"use client";
import React, { useState } from "react";
import { BadgeJapaneseYen } from "lucide-react";
import { categoryTestData } from "@/app/components/home/CategoryDetails";

type FormFieldProps = {
  varient?: "expense" | "income";
  money?: number;
  categoryId?: number;
  date?: string;
  memo?: string;
};

export const FormField: React.FC<FormFieldProps> = ({
  varient = "expense",
  money = 0,
  categoryId,
  date,
  memo = "",
}) => {
  const [amount, setAmount] = useState<number>(money);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categoryId
  );
  const [selectedDate, setSelectedDate] = useState<string>(date);
  const [note, setNote] = useState<string>(memo);

  const newData = categoryTestData.filter((i) => i.type === varient);

  return (
    <ul className="space-y-10 pt-8">
      {/* 金額 */}
      <li className="flex flex-row items-center justify-between border-b-2 border-gray-300 pb-5">
        <div className="flex flex-row">
          <BadgeJapaneseYen width={24} height={24} />
          <label>Amount</label>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className={
            varient === "expense"
              ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px]"
              : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px]"
          }
        />
      </li>

      {/* カテゴリ */}
      <li className="flex flex-row items-center justify-between">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className={
            varient === "expense"
              ? "select rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px] text-sm"
              : "select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px] text-sm"
          }
        >
          {newData.map((i) => (
            <option key={i.id} value={i.id}>
              {i.category}
            </option>
          ))}
        </select>
      </li>

      {/* 日付 */}
      <li className="flex flex-row items-center justify-between">
        <label>Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className={
            varient === "expense"
              ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px]"
              : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px]"
          }
        />
      </li>

      {/* メモ */}
      <li className="flex flex-row justify-between">
        <label>Memo</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={
            varient === "expense"
              ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[86px]"
              : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[86px]"
          }
        />
      </li>
    </ul>
  );
};
