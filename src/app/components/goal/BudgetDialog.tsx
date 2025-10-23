"use client";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jpMoneyChange } from "@/app/lib/utils";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";

export const BudgetDialog = ({
  yearMonth,
  budgetMoney,
  onSave,
  disabled,
}: {
  yearMonth: string;
  budgetMoney: number;
  onSave: () => void;
  disabled: boolean;
}) => {
  return (
    <>
      <DialogTrigger
        disabled={disabled}
        className={`btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#F06E9C] w-[165px] h-[47px] ${
          disabled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-[#F6A2BF] hover:bg-[#F06E9C]"
        }`}
      >
        Save
      </DialogTrigger>
      <DialogContent className="w-[348px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            <p className="text-maincolor text-xl text-[#E93578]">Budget Set</p>
          </DialogTitle>
        </DialogHeader>
        <div className="pt-4 flex flex-col items-center gap-5">
          <p className="border-b-2 border-gray-300 pb-6 text-[15px]">
            Your budget has been set successfully.
          </p>
          <p className="text-[13px] ">Your available money for this month is</p>
          <div className="flex flex-col items-center justify-center">
            <span className="text-[#E93578] text-base">{yearMonth}</span>
            <span className="text-[#E93578] text-[28px]">
              {jpMoneyChange(budgetMoney)}
            </span>
          </div>
          <ButtonGroup label="save" varient="budget" onClick={onSave} />
        </div>
      </DialogContent>
    </>
  );
};
