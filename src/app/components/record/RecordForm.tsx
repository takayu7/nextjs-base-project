"use client";
import React, { useState, useTransition } from "react";
import { AppRecord } from "@/app/types/type";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { FormField } from "@/app/components/record/FormField";
// import { ConeIcon } from "lucide-react";

export const RecordForm = () => {
  const [isPending, startTransition] = useTransition();
  const [recordData, setRecordData] = useState<{
    typeId: number;
    money: number;
    categoryId: number;
    date: Date;
    memo: string;
  } | null>(null);

  const onSave = async (record: AppRecord) => {
    console.log("record:", record);
    const res = await fetch("/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });
    const data = await res.text();
    console.log("Response text:", data);
  };

  const handleSave = (record: AppRecord) => {
    startTransition(() => {
      onSave(record);
    });
    
  };

  // 日付のフォーマット
  const today = new Date();
  const formatted = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join(".");

  return (
    <div className="w-[350px]">
      <div className="flex justify-center mt-3 flex-col items-center">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          {formatted}
        </h1>
        <div className="flex max-w-full flex-col gap-6">
          <Tabs defaultValue="expense" className="w-[350px]">
            <TabsButton />

            {/* 支出 */}
            <TabsContent value="expense">
              <FormField typeId={1} onChange={(data) => setRecordData(data)} />
              <div className="flex items-center justify-center pt-25">
                <ButtonGroup
                  label="Save"
                  varient="expense"
                  
                  onClick={() => {
                    if (!recordData) return;
                    handleSave({
                      userId: 1,
                      typeId: recordData.typeId,
                      categoryId: recordData.categoryId,
                      money: recordData.money,
                      date: recordData.date.toISOString().split("T")[0],
                      memo: recordData.memo,
                    });
                  }}
                />
              </div>
            </TabsContent>

            {/* 収入 */}
            <TabsContent value="income">
              <FormField typeId={2} onChange={(data) => setRecordData(data)}/>
              <div className="flex items-center justify-center pt-25">
                <ButtonGroup
                  label="Save"
                  varient="income"
                  onClick={() => {
                    if (!recordData) return;
                    handleSave({
                      userId: 1,
                      typeId: recordData.typeId,
                      categoryId: Number(recordData.categoryId),
                      money: recordData.money,
                      date: recordData.date.toISOString().split("T")[0],
                      memo: recordData.memo,
                    });
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
