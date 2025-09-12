"use client";
import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type ChartData={
  browser: string;
  visitors: number;
  fill: string;
}

type HomePieChartProps = {
  data: ChartData[];
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

export const HomePieChart: React.FC<HomePieChartProps> = ({ data }) => {
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
          <Pie data={data} dataKey="visitors" nameKey="browser" />
        </PieChart>
      </ChartContainer>
    </div>
  );
};
