"use client";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { PiggyBank } from "lucide-react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { jpMoneyChange } from "@/app/lib/utils";
import {
  Wallet,
  CircleArrowDown,
  CheckCheck,
  TriangleAlert,
} from "lucide-react";
import { Budget } from "@/app/types/type";

type BudgetRemainingTooltipProps = {
  remaining: number;
  budget: number;
};

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const nowDate = `${year}-${String(month).padStart(2, "0")}`;

export const BudgetRemainingTooltip: React.FC<BudgetRemainingTooltipProps> = ({
  remaining,
  budget,
}) => {
  const [monthlyBudget, setMonthlyBudget] = useState<Budget | null>(null);

  const used = budget - remaining;
  const isOver = remaining < 0;
  // const userId = 1;

  // DBからデータ取得
  useEffect(() => {
    const fetchBudget = async () => {
      const res = await fetch(`/api/budgetByMonth/${nowDate}`);
      const data = await res.json();
      setMonthlyBudget(data[0] ?? null);
    };
    fetchBudget();
  }, []);

  console.log("today:", nowDate);
  console.log("monthlyBudget:", monthlyBudget);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PiPiggyBankDuotone className="w-[50px] h-[50px] text-[#F6A2BF]" />
      </TooltipTrigger>
      <TooltipContent className="text-sm font-medium space-y-1 text-gray-600">
        <div className="flex items-center gap-1 justify-center">
          <span>{nowDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Wallet />
          <span>budget: {jpMoneyChange(monthlyBudget?.money)}</span>
        </div>
        <div className="flex items-center gap-1">
          <CircleArrowDown />
          <span>used: {jpMoneyChange(used)}</span>
        </div>
        {isOver ? (
          <div>
            <TriangleAlert />
            <span className="text-red-600">残り: 0円</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <CheckCheck style={{ color: "#75A9F9" }} />
            <span className="text-[#75A9F9]">
              remaining: {jpMoneyChange(remaining)}
            </span>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
