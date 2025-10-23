"use client";
import React, { useEffect, useState } from "react";
import { BadgeJapaneseYen } from "lucide-react";
import { Category, Type } from "@/app/types/type";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  typeId: Type["id"];
  register: UseFormRegister<any>;
  errors: FieldErrors;
};

export const FormField: React.FC<FormFieldProps> = ({
  typeId,
  register,
  errors,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("カテゴリ取得失敗:", error);
      }
    };
    fetchData();
  }, []);

  const filteredCategories = categories.filter((c) => c.typeId === typeId);

  console.log(typeId);

  return (
    <ul className="space-y-8 pt-8">
      {/* 金額 */}
      <li className="flex flex-row justify-between border-b-2 border-gray-300 pb-5">
        <label className="flex items-center gap-2 font-semibold">
          <BadgeJapaneseYen width={20} height={20} />
          Amount
        </label>
        <div className="flex flex-col">
          <input
            type="number"
            {...register("money", {
              required: "金額を入力してください",
              min: { value: 1, message: "1円以上を入力してください" },
            })}
            className={
              typeId === 1
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px]"
            }
          />
          {errors.money && (
            <p className="text-red-500 text-sm mt-1">
              {errors.money.message as string}
            </p>
          )}
        </div>
      </li>

      {/* カテゴリ */}
      <li className="flex flex-row items-center justify-between">
        <label className="font-semibold">Category</label>
        <div className="flex flex-col">
          <select
            {...register("categoryId", {
              required: "カテゴリを選択してください",
              validate: (v) => v !== "0" || "カテゴリを選んでください",
            })}
            className={
              typeId === 1
                ? "select rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px] text-sm"
                : "select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px] text-sm"
            }
          >
            <option value="0">please select</option>
            {filteredCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message as string}
            </p>
          )}
        </div>
      </li>

      {/* 日付 */}
      <li className="flex flex-row items-center justify-between">
        <label className="font-semibold">Date</label>
        <div className="flex flex-col">
          <input
            type="date"
            {...register("date", { required: "日付を入力してください" })}
            className={
              typeId === 1
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[30px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[30px]"
            }
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">
              {errors.date.message as string}
            </p>
          )}
        </div>
      </li>

      {/* メモ */}
      <li className="flex flex-row justify-between">
        <label className="font-semibold">Memo</label>
        <div className="flex flex-col">
          <textarea
            {...register("memo", {
              maxLength: {
                value: 50,
                message: "100文字以内で入力してください",
              },
            })}
            className={
              typeId === 1
                ? "rounded-[3px] border-1 border-[#75A9F9] px-2 py-1 w-[184px] h-[86px]"
                : "rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[184px] h-[86px]"
            }
          />
          {errors.memo && (
            <p className="text-red-500 text-sm mt-1">
              {errors.memo.message as string}
            </p>
          )}
        </div>
      </li>
    </ul>
  );
};
