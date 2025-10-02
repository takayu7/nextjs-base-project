import { IconSheet } from "@/app/components/molecules/IconSheet";
import { BudgetRemainingTooltip } from "@/app/components/home/BudgetRemainingTooltip";
import {
Tooltip,
} from "@/components/ui/tooltip";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-15 pt-5">
      <IconSheet />
      <Tooltip>
        <BudgetRemainingTooltip remaining={30000} budget={50000} />
      </Tooltip>
    </header>
  );
};
