"use client";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { useState, useTransition, useEffect } from "react";
import { InputField } from "@/app/components/molecules/InputField";
import { BudgetDialog } from "@/app/components/goal/BudgetDialog";
import { Dialog } from "@/components/ui/dialog";
import { Budget } from "@/app/types/type";
import { jpMoneyChange } from "@/app/lib/utils";
import { Player } from "@lottiefiles/react-lottie-player";
import { useForm } from "react-hook-form";
import { isValid } from "date-fns";

export const InputBudget = () => {
  //現在の年月
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const formatted = `${year}-${month}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Budget>({ mode: "onChange" });

  const [yearMonth, setYearMonth] = useState("");
  const [budgetMoney, setBudgetMoney] = useState<string>("");
  const [budgetData, setBudgetData] = useState<{
    money: number;
    yearMonth: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // ユーザーIDをセッションストレージから取得
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(Number(id));
    }
  }, [userId]);

  const fetchBudget = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/budgetByMonth/${formatted}?userId=${userId}`,
      {
        cache: "no-store",
      }
    );
    const data = await res.json();
    setBudgetData(data[0] ?? null);
    setLoading(false);
  };

  //初回読み込み時にデータ取得
  useEffect(() => {
    if (userId !== null) {
      fetchBudget();
    }
  }, [userId]);

  //登録・更新処理
  const onSave = async (budget: Budget) => {
    // 同じ月なら更新、違う月なら新規
    const method =
      budgetData && budgetData.yearMonth === budget.yearMonth ? "PUT" : "POST";

    console.log("送信データ:", budget, "method:", method);

    const res = await fetch("/api/budgetUser", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(budget),
      cache: "no-store",
    });

    const data = await res.json();
    console.log("Response:", data);

    //送信後に最新データを再取得
    await fetchBudget();
    setIsEditing(false);
  };

  const onSubmit = () => {
    if (!userId) return;
    const budgetInfo: Budget = {
      userId,
      yearMonth: yearMonth || formatted,
      money: Number(budgetMoney),
    };
    startTransition(() => {
      onSave(budgetInfo);
    });
  };

  console.log(isPending);

  return (
    <div className="w-[350px]">
      <div className="flex justify-center pt-5 flex-col items-center">
        <h1 className="text-maincolor text-2xl font-bold font-mono">
          Monthly Budget
        </h1>
        {loading ? (
          <div>
            <Player
              autoplay
              loop
              src="/Loading.json"
              style={{
                height: "100px",
                width: "100px",
              }}
            />
          </div>
        ) : (
          <div className="pt-25 flex flex-col items-center gap-10">
            {/* 当月の予算が登録済みの時 */}
            {budgetData && budgetData.yearMonth === formatted && !isEditing ? (
              <div className="flex justify-center mt-10">
                <div className="bg-white shadow-lg rounded-2xl p-8 w-[320px] text-center space-y-4 border border-gray-100">
                  <p className="text-gray-600 text-lg">Your budget for</p>
                  <p className="text-[#E93578] text-3xl font-bold tracking-wide">
                    {budgetData.yearMonth}
                  </p>

                  <p className="text-gray-600 text-lg">is</p>
                  <p className="text-[#E93578] text-4xl font-extrabold">
                    {jpMoneyChange(budgetData.money)}
                  </p>

                  <div className="border-t border-gray-200 my-3" />

                  <ButtonGroup
                    label="Edit"
                    varient="budget"
                    onClick={() => {
                      setIsEditing(true);
                      setYearMonth(budgetData.yearMonth);
                      setBudgetMoney(String(budgetData.money));
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <p>How much is your budget for this month?</p>
                {/* 月選択 */}
                <input
                  type="month"
                  value={yearMonth || formatted}
                  min={formatted}
                  {...register("yearMonth", {
                    required: "Date of year and month is required.",
                  })}
                  onChange={(e) => setYearMonth(e.target.value)}
                  className="select rounded-[3px] border-1 border-[#F06E9C] px-2 py-1 w-[180px] h-[32px]"
                />
                {/* 予算入力 */}
                <InputField
                  id="budget"
                  type="number"
                  placeholder="budget"
                  varient="box"
                  isError={!!errors.money}
                  value={budgetMoney}
                  {...register("money", {
                    required: "Budget amount is required.",
                    min: {
                      value: 1,
                      message: "Please enter 1 yen or more.",
                    },
                    max: {
                      value: 100000000,
                      message:
                        "Please enter an amount no more than 100,000,000 yen.",
                    },
                    validate: (value) =>
                      !isNaN(value) || "Please enter a numeric value.",
                  })}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBudgetMoney(e.target.value)
                  }
                />
                {errors.money && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.money.message}
                  </p>
                )}
                {/* Saveボタン */}
                <Dialog>
                  <BudgetDialog
                    yearMonth={yearMonth || formatted}
                    budgetMoney={Number(budgetMoney)}
                    onSave={handleSubmit(onSubmit)}
                    disabled={!isValid || Number(budgetMoney) <= 0}
                  />
                </Dialog>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
