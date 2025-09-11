"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A simple pie chart";

const chartData = [
  { browser: "Housing", visitors: 220, fill: "#FDCDAC" },
  { browser: "Hobby", visitors: 220, fill: "#E6F5C9" },
  { browser: "Food", visitors: 187, fill: "#CBD5E8" },
  { browser: "Social", visitors: 125, fill: "#F4CAE4" },
  { browser: "Utilities", visitors: 90, fill: "#FFF2AE" },
  { browser: "Daily goods", visitors: 50, fill: "#F1E2CC" },
  { browser: "Medical", visitors: 20, fill: "#CCCCCC" },
];

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

export function HomePieChart() {
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
          <Pie data={chartData} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
