"use client";
import React, { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Category, Type } from "@/app/types/type";

type ChartData = {
  browser: string;
  visitors: number;
  fill: string;
};

type HomePieChartProps = {
  typeId: Type["id"];
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

export const HomePieChart: React.FC<HomePieChartProps> = ({ typeId }) => {
  const [pieChartData, setPieChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/categories");
        const categories = await res.json();
        console.log("データ:", categories);
        //typeごとにグループ化
        const newData = categories.filter((i) => i.typeId === typeId);
        //グラフ用データに
        const chart = newData.map((c) => ({
          browser: c.name,
          visitors: Math.floor(Math.random() * 500 + 50),
          fill: c.color,
        }));
        setPieChartData(chart);
      } catch (error) {
        console.error("失敗:", error);
      }
    };
    fetchData();
  }, [typeId]);

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
