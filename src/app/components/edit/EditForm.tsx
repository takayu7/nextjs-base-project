"use client";
import { FormField } from "@/app/components/record/FormField";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { PencilLine } from "lucide-react";

export const EditForm = () => {
  return (
    <>
      <div className="flex justify-center mt-3 flex-col items-center">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          2025.09.04
        </h1>
        <FormField
          varient="expense"
          money={2500}
          categoryId={2}
          date="2025-09-04"
          memo="Live ticket and goods"
        />
        <div className="flex items-center justify-center pt-10 flex-row">
          <ButtonGroup
            label={
              <div className="flex justify-center items-center gap-2">
                <PencilLine className="w-4 h-4" />
                Edit
              </div>
            }
            varient="expense"
          />
        </div>
      </div>
    </>
  );
};
