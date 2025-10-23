"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/record/FormField";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { PencilLine } from "lucide-react";
import { History, AppRecord } from "@/app/types/type";
import { useRouter } from "next/navigation";
// import { Player } from "@lottiefiles/react-lottie-player";

export const EditForm = () => {
  const [selectedHistory, setSelectedHistory] = useState<History | null>(null);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppRecord>();

  // sessionStorageから履歴データを取得
  useEffect(() => {
    const data = sessionStorage.getItem("selectedHistory");
    if (data) {
      const parsed = JSON.parse(data);
      setSelectedHistory(parsed);

      // 初期値をセット
      setValue("money", parsed.money);
      setValue("categoryId", parsed.categoryId);
      setValue("date", parsed.date.split("T")[0]);
      setValue("memo", parsed.memo);
    }
  }, [setValue]);

  if (!selectedHistory) return <div>Loading...</div>;

  const formattedDate = new Date(selectedHistory.date).toLocaleDateString(
    "ja-JP"
  );

  //更新処理
  const onSubmit = async (data: AppRecord) => {
    try {
      const res = await fetch(`/api/records`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: selectedHistory.id,
          userId: selectedHistory.userId,
          typeId: selectedHistory.typeId,
        }),
      });

      if (!res.ok) throw new Error("更新失敗");
      router.push("/home");
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  return (
    <div className="flex justify-center mt-3 flex-col items-center">
      <h1 className="text-maincolor text-xl font-bold font-mono ">
        {formattedDate}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          typeId={selectedHistory.typeId}
          register={register}
          errors={errors}
          defaultValues={{
            money: selectedHistory.money,
            categoryId: selectedHistory.categoryId,
            date: new Date(selectedHistory.date).toISOString().split("T")[0],

            memo: selectedHistory.memo,
          }}
        />

        <div className="flex items-center justify-center pt-25 flex-row">
          <ButtonGroup
            label={
              <div className="flex justify-center items-center gap-2">
                <PencilLine className="w-4 h-4" />
                Edit
              </div>
            }
            varient={selectedHistory.typeId === 1 ? "expense" : "income"}
          />
        </div>
      </form>
    </div>
  );
};
