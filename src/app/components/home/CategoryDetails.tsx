"use client";
import React, { useEffect, useState } from "react";
import { categoryIcon, jpMoneyChange } from "@/app/lib/utils";
import { Category, TypeIdProps, History } from "@/app/types/type";

interface CategoryDetailsProps extends TypeIdProps {
  selectedMonth: string;
}

export const CategoryDetails: React.FC<CategoryDetailsProps> = ({
  typeId,
  selectedMonth,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [records, setRecords] = useState<History[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // ユーザーIDをセッションストレージから取得
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(Number(id));
    }
  }, []);

  // DBから支出・収入データ取得
  useEffect(() => {
    if (!userId || userId === 0) return;
    setLoading(true);
    fetch(`/api/histories/${userId}`)
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .finally(() => setLoading(false));
  }, [userId]);

  console.log(loading);

  // DBからカテゴリデータ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await fetch("/api/categories");
        const categoryData = await categoryRes.json();
        console.log("データ:", categoryData);
        setCategories(categoryData);
      } catch (error) {
        console.error("失敗:", error);
      }
    };
    fetchData();
  }, []);

  console.log(records, categories);

  //支出・収入の分類(カテゴリ)
  const newCategoryData = categories.filter((i) => i.typeId === typeId);

  // recordsを配列に
  const allRecords = Object.values(records).flat();

  // 選択中の月データに絞る
  const [selectedYear, selectedMonthNum] = selectedMonth.split("-").map(Number);
  const monthlyRecords = allRecords.filter((r) => {
    const date = new Date(r.date);
    return (
      r.typeId === typeId &&
      date.getFullYear() === selectedYear &&
      date.getMonth() + 1 === selectedMonthNum
    );
  });

  //支出・収入の分類(履歴)
  const newRecordData = monthlyRecords.filter((r) => r.typeId === typeId);

  // カテゴリごとに合計金額を計算
  const categoryTotals = newRecordData.reduce((acc, record) => {
    acc[record.categoryId] = (acc[record.categoryId] || 0) + record.money;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div>
      {newCategoryData.map((c, index) => (
        <ul key={index} className="flex flex-col">
          <li className="flex w-full items-center justify-between font-semibold text-gray-800 text-sm py-1">
            <div className="flex flex-row items-center">
              <span className="pr-3.5">
                {" "}
                {categoryIcon(Number(c.id), c.color, 24)}
              </span>
              <p className="text-lg" style={{ color: c.color }}>
                {" "}
                {c.name}
              </p>
            </div>
            <p className="text-[#444444]">
              {jpMoneyChange(categoryTotals[c.id] ?? 0)}
            </p>
          </li>
        </ul>
      ))}
    </div>
  );
};
