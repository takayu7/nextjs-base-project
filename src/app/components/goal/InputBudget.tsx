"use client";
import { InputField } from "@/app/components/molecules/InputField";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";

import { useRouter } from "next/navigation";

export const InputBudget = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center pt-5 flex-col items-center">
          <h1 className="text-maincolor text-2xl font-bold font-mono">
            Monthly Budget
          </h1>
          <div className="pt-25 flex flex-col items-center gap-10">
            <p>How much is your budget for this month?</p>
            <select className="select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[180px] h-[32px]" />
            <InputField
              id="budget"
              type="text"
              placeholder="budget"
              varient="box"
            />
            <ButtonGroup label="Save" varient="income" onClick={() => router.push("/goal")}/>
          </div>
        </div>
      </div>
    </>
  );
};
