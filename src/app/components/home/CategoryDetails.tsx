"use client";
import React, { useEffect, useState } from "react";
import { categoryIcon, jpMoneyChange } from "@/app/lib/utils";
import { Category, TypeIdProps, History } from "@/app/types/type";

// export const categoryTestData = [
//   {
//     id: 1,
//     category: "Housing",
//     amount: 50000,
//     color: "#FFA834",
//     type: "expense",
//   },
//   {
//     id: 2,
//     category: "Hobby",
//     amount: 50000,
//     color: "#92D36E",
//     type: "expense",
//   },
//   {
//     id: 3,
//     category: "Food",
//     amount: 40000,
//     color: "#75A9F9",
//     type: "expense",
//   },
//   {
//     id: 4,
//     category: "Social",
//     amount: 30000,
//     color: "#E692F8",
//     type: "expense",
//   },
//   {
//     id: 5,
//     category: "Utilities",
//     amount: 14000,
//     color: "#FEF67F",
//     type: "expense",
//   },
//   {
//     id: 6,
//     category: "Daily goods",
//     amount: 10000,
//     color: "#FDBCA5",
//     type: "expense",
//   },
//   {
//     id: 7,
//     category: "Medical",
//     amount: 6000,
//     color: "#7A7A7A",
//     type: "expense",
//   },
//   {
//     id: 8,
//     category: "Salary",
//     amount: 80000,
//     color: "#FDACAC",
//     type: "income",
//   },
// ];

export const CategoryDetails: React.FC<TypeIdProps> = ({ typeId }) => {
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

  //支出・収入の分類(履歴)
  const newRecordData = allRecords.filter((r) => r.typeId === typeId);

  // 当月のカテゴリごとに合計
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const categoryTotals = newRecordData.reduce((acc, r) => {
    const recordDate = new Date(r.date);
    if (
      recordDate.getFullYear() === thisYear &&
      recordDate.getMonth() === thisMonth
    ) {
      acc[r.categoryId] = (acc[r.categoryId] || 0) + r.money;
    }
    return acc;
  }, {} as Record<number, number>);

  console.log(categoryTotals);

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
