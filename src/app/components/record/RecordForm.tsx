"use client";
import React, { useState, useTransition, useEffect } from "react";
import { AppRecord, TypeIdProps } from "@/app/types/type";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { FormField } from "@/app/components/record/FormField";
import { useForm } from "react-hook-form";

export const RecordForm: React.FC<TypeIdProps> = () => {
  const [isPending, startTransition] = useTransition();
  const [userId, setUserId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppRecord>({
    defaultValues: {
      money: 0,
      categoryId: 0,
      date: new Date(),
      memo: "",
    },
  });

  // ユーザーIDをセッションストレージから取得
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) setUserId(Number(id));
  }, []);

  const onSave = async (record: AppRecord) => {
    const res = await fetch("/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      cache: "no-store",
    });
    const data = await res.text();
    console.log("Response:", data);
    window.dispatchEvent(new Event("recordUpdated"));
  };

  const onSubmit = (data: AppRecord) => {
    if (!userId) return;

    const record: AppRecord = {
      userId: Number(userId),
      typeId: Number(typeId),
      categoryId: Number(data.categoryId),
      money: Number(data.money),
      date: new Date(data.date),
      memo: data.memo || "",
    };

    startTransition(() => {
      onSave(record);
      reset();
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
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

  console.log(isPending);

  return (
    <div className="w-[350px]">
      <div className="flex justify-center mt-3 flex-col items-center">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          {formatted}
        </h1>
        <div className="flex max-w-full flex-col gap-6">
          <Tabs
            defaultValue="expense"
            className="w-[350px]"
            onValueChange={(v) => setTypeId(v === "expense" ? 1 : 2)}
          >
            <TabsButton />

            {/* 支出 */}
            <TabsContent value="expense">
              <form>
                <FormField typeId={1} register={register} errors={errors} />
                <div className="flex items-center justify-center pt-25">
                  {!isSaved && (
                    <ButtonGroup
                      label="Save"
                      varient="expense"
                      onClick={handleSubmit(onSubmit)}
                      type="submit"
                    />
                  )}
                  {isSaved && (
                    <p className="text-[#75A9F9] font-extrabold text-2xl">
                      Saved successfully!
                    </p>
                  )}
                </div>
              </form>
            </TabsContent>

            {/* 収入 */}
            <TabsContent value="income">
              <form>
                <FormField typeId={2} register={register} errors={errors} />
                <div className="flex items-center justify-center pt-25">
                  {!isSaved && (
                    <ButtonGroup
                      label="Save"
                      varient="income"
                      onClick={handleSubmit(onSubmit)}
                      type="submit"
                    />
                  )}
                  {isSaved && (
                    <p className="text-[#F06E9C] font-extrabold text-2xl">
                      Saved successfully!
                    </p>
                  )}
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
