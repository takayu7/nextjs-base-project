"use client";
import React, { useState, useEffect } from "react";
import { BadgeJapaneseYen } from "lucide-react";
import { Category, Type } from "@/app/types/type";

type FormFieldProps = {
  typeId: Type["id"];
  money?: string;
  categoryId?: number;
  date?: string;
  memo?: string;
  onChange?: (record: {
    typeId: number;
    categoryId: number;
    money: number;
    date: Date;
    memo: string;
  }) => void;
};

export const FormField: React.FC<FormFieldProps> = ({
  typeId,
  money = "",
  categoryId,
  // date,
  memo = "",
  onChange,
}) => {
  const [amount, setAmount] = useState<string>(money);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    categoryId
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [note, setNote] = useState<string>(memo);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        console.log("データ:", data);
        setCategories(data);
      } catch (error) {
        console.error("失敗:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({
        typeId,
        money: Number(amount) || 0,
        categoryId: selectedCategory || 0,
        date: selectedDate ?? new Date(),
        memo: note,
      });
    }
  }, [amount, selectedCategory, selectedDate, note, typeId]);

  const newData = categories.filter((i) => i.typeId === typeId);

  console.log(selectedCategory);

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
          onChange={(e) => setAmount(e.target.value)}
          className={
            typeId === 1
              ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px]"
              : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px]"
          }
        />
      </li>

      {/* カテゴリ */}
      <li className="flex flex-row items-center justify-between">
        <label>Category</label>
        <select
        required
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className={
            typeId === 1
              ? "select rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px] text-sm"
              : "select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px] text-sm"
          }
        >
          <option className="text-gray-200 hidden">please select</option>
          {newData.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </select>
      </li>

      {/* 日付 */}
      <li className="flex flex-row items-center justify-between">
        <label>Date</label>
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className={
            typeId === 1
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
            typeId === 1
              ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[86px]"
              : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[86px]"
          }
        />
      </li>
    </ul>
  );
};
