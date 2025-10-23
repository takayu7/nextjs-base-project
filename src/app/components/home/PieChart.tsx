"use client";
import React, { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Category, History, TypeIdProps } from "@/app/types/type";

type ChartData = {
  browser: string;
  visitors: number;
  fill: string;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export const HomePieChart: React.FC<TypeIdProps> = ({ typeId }) => {
  const [pieChartData, setPieChartData] = useState<ChartData[]>([]);
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

  useEffect(() => {
    console.log(records);
    const fetchData = async () => {
      try {
        const categoryRes = await fetch("/api/categories");
        const categoryData = await categoryRes.json();
        console.log("データ:", categoryData);

        const today = new Date();
        const thisMonth = today.getMonth();
        const thisYear = today.getFullYear();

        // recordsを配列に
        const allRecords = Object.values(records).flat();

        // 当月の履歴を typeId ごとに絞り込み
        const monthlyRecords = allRecords.filter((r) => {
          const date = new Date(r.date);
          return (
            r.typeId === typeId &&
            date.getFullYear() === thisYear &&
            date.getMonth() === thisMonth
          );
        });

        // カテゴリごとに合計金額を計算
        const categoryTotals = monthlyRecords.reduce((acc, record) => {
          acc[record.categoryId] = (acc[record.categoryId] || 0) + record.money;
          return acc;
        }, {} as Record<number, number>);

        // typeIdに対応するカテゴリのみ抽出
        const filteredCategories = categoryData.filter(
          (c) => c.typeId === typeId
        );

        // グラフ用データ作成
        const chart = filteredCategories
          .map((c) => ({
            browser: c.name,
            visitors: categoryTotals[c.id] || 0,
            fill: c.color,
          }))
          // 金額が0のカテゴリは非表示に
          .filter((c) => c.visitors > 0);

        setPieChartData(chart);
        console.log(chart);
      } catch (error) {
        console.error("失敗:", error);
      }
    };
    fetchData();
  }, [records, typeId]);

  return (
    <div className="flex flex-col items-center -mt-4">
      <ChartContainer
        config={chartConfig}
        className="aspect-square w-[280px] max-h-[280px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie data={pieChartData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </div>
  );
};
