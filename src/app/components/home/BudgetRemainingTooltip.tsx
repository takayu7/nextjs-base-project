"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { PiggyBank } from "lucide-react";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { jpMoneyChange } from "@/app/lib/utils";
import { Wallet, CircleArrowDown, CheckCheck, TriangleAlert } from "lucide-react";

type BudgetRemainingTooltipProps = {
  remaining: number;
  budget: number;
};

export const BudgetRemainingTooltip: React.FC<BudgetRemainingTooltipProps> = ({
  remaining,
  budget,
}) => {
  const used = budget - remaining;
  const isOver = remaining < 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PiPiggyBankDuotone className="w-[50px] h-[50px] text-[#F6A2BF]" />
      </TooltipTrigger>
      <TooltipContent className="text-sm font-medium space-y-1 text-gray-600">
        <div className="flex items-center gap-1">
          <Wallet />
          <span>budget: {jpMoneyChange(budget)}</span>
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
           <CheckCheck style={{color: "#75A9F9"}}/>
          <span className="text-[#75A9F9]">remaining: {jpMoneyChange(remaining)}</span>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
