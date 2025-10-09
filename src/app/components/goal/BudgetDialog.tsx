"use client";
import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { jpMoneyChange } from "@/app/lib/utils";
import { Budget } from "@/app/types/type";

export const BudgetDialog = ({
  yearMonth,
  budget,
  budgetData,
  onSave,
}: {
  yearMonth: string;
  budget: number;
  budgetData: Budget;
  onSave: () => void;
}) => {

  console.log("予算:", budgetData);
  console.log(budgetData?.yearMonth);

  return (
    <>
      <DialogTrigger
        onClick={onSave}
        className="btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#F06E9C] w-[165px] h-[47px]"
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
            <span className="text-[#E93578] text-base">{budgetData?.yearMonth}</span>
            <span className="text-[#E93578] text-[28px]">
              {jpMoneyChange(budgetData?.money)}
            </span>
          </div>
          {/* <ButtonGroup label="Change Budget" varient="budget" /> */}
        </div>
      </DialogContent>
    </>
  );
};
