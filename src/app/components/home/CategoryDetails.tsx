"use client";
import React, { useEffect, useState } from "react";
import { jpMoneyChange, categoryIcon } from "@/app/lib/utils";
import { Category, TypeIdProps } from "@/app/types/type";

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

  const newData = categories.filter((i) => i.typeId === typeId);
  console.log(categories);
  console.log(newData);
  console.log(typeId);

  return (
    <div>
      {newData.map((c, index) => (
        <ul key={index} className="flex flex-col">
          <li className="flex w-full items-center justify-between font-semibold text-gray-800 text-sm py-1">
            <div className="flex flex-row items-center">
              <span className="pr-3.5">
                {" "}
                  {categoryIcon(Number(c.id), c.color, 24)}
              </span>
              <p className="text-lg" style={{ color: c.color }}> {c.name}</p>
            </div>
            {/* <p className="text-[#444444]">{jpMoneyChange(category.amount)}</p> */}
          </li>
        </ul>
      ))}
    </div>
  );
};


