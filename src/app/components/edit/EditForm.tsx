"use client";
import React, { useEffect, useState } from "react";
import { FormField } from "@/app/components/record/FormField";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { PencilLine } from "lucide-react";
import { Category, TypeIdProps, History } from "@/app/types/type";

export const EditForm = () => {
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);
  useEffect(() => {
    const data = sessionStorage.getItem("selectedHistory") ?? "";
    if (data) {
      setSelectedHistory(JSON.parse(data));
    }
  }, []);
  console.log(selectedHistory);

  if (!selectedHistory) {
    return <div>Loading...</div>;
  }

  const date = new Date(selectedHistory.date);
  const formatted = date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join(".");
  console.log("date:", formatted);

  return (
    <>
      <div className="flex justify-center mt-3 flex-col items-center">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          {formatted}
        </h1>
        <FormField
          typeId={selectedHistory?.typeId ?? 0}
          money={String(selectedHistory?.money)}
          categoryId={selectedHistory?.categoryId}
          date={selectedHistory?.date}
          memo={selectedHistory?.memo}
        />
        <div className="flex items-center justify-center pt-10 flex-row">
          <ButtonGroup
            label={
              <div className="flex justify-center items-center gap-2">
                <PencilLine className="w-4 h-4" />
                Edit
              </div>
            }
            // varient="expense"
          />
        </div>
      </div>
    </>
  );
};
