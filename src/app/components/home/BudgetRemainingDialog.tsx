"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { jpMoneyChange } from "@/app/lib/utils";
import {
  Wallet,
  CircleArrowDown,
  CheckCheck,
  TriangleAlert,
} from "lucide-react";
import { Budget, History, TypeIdProps } from "@/app/types/type";
import { Player } from "@lottiefiles/react-lottie-player";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const nowDate = `${year}-${String(month).padStart(2, "0")}`;

export const BudgetRemainingDialog: React.FC<TypeIdProps> = ({ typeId }) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<History[]>([]);
  const [monthlyBudget, setMonthlyBudget] = useState<Budget | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  // ユーザーIDをセッションストレージから取得
  const updateHeaderInfo = useCallback(() => {
    const storedId = sessionStorage.getItem("userId") || "0";
    setUserId(Number(storedId));
  }, []);

  //再ログイン時にuserIdの値を更新する
  useEffect(() => {
    updateHeaderInfo();
    const handler = () => updateHeaderInfo();
    window.addEventListener("headerUpdate", handler);
    return () => {
      window.removeEventListener("headerUpdate", handler);
    };
  }, [updateHeaderInfo]);

  // DBから予算データ取得
  const fetchData = async (id: number) => {
    setLoading(true);
    try {
      // 予算
      const budgetRes = await fetch(
        `/api/budgetByMonth/${nowDate}?userId=${id}`
      );
      const budgetData = await budgetRes.json();
      setMonthlyBudget(budgetData[0] ?? null);

      // 履歴
      const recordRes = await fetch(`/api/histories/${id}`);
      const recordData = await recordRes.json();
      setRecords(recordData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //記録が追加・更新されたら再取得する
  useEffect(() => {
    if (!userId) return;
    fetchData(userId);
    const handleUpdate = () => fetchData(userId);
    window.addEventListener("recordUpdated", handleUpdate);
    return () => {
      window.removeEventListener("recordUpdated", handleUpdate);
    };
  }, [userId]);

  const handleDialogOpen = async () => {
    if (userId) {
      await fetchData(userId);
    }
  };

  // recordsを配列に
  const allRecords = Object.values(records).flat();

  //支出・収入の分類(履歴)
  const newRecordData = allRecords.filter(
    (r) => (r.typeId === 2) === (typeId === 2)
  );

  //当月の合計金額
  useEffect(() => {
    if (!newRecordData.length) {
      setTotalMoney(0);
      return;
    }
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const totals = newRecordData.reduce((total, rec) => {
      const recordDate = new Date(rec.date);
      if (
        recordDate.getFullYear() === thisYear &&
        recordDate.getMonth() === thisMonth
      ) {
        return total + rec.money;
      }
      return total;
    }, 0);
    setTotalMoney(totals);
  }, [newRecordData]);

  //remain(残高)
  const remaining = Number(monthlyBudget?.money) - totalMoney || 0;
  const isOver = remaining <= 0;
  console.log(remaining);

  //豚の色
  const persent = (totalMoney / Number(monthlyBudget?.money)) * 100;

  return (
    <Dialog onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild onClick={handleDialogOpen}>
        <PiPiggyBankDuotone
          className={
            persent >= 100
              ? "w-[50px] h-[50px] text-[#ff0000]"
              : persent >= 75
              ? "w-[50px] h-[50px] text-[#ff7f50]"
              : persent >= 50
              ? "w-[50px] h-[50px] text-[#ffd700]"
              : persent >= 25
              ? "w-[50px] h-[50px] text-[#F6A2BF]"
              : "w-[50px] h-[50px] text-[#F6A2BF]"
          }
        />
      </DialogTrigger>
      <DialogContent className="w-[348px] bg-gray-100">
        <DialogTitle className="flex justify-center items-center">
          <p className="text-maincolor text-xl text-[#E93578]">
            {nowDate.replace("-", ".")}
          </p>
        </DialogTitle>
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
        ) : !monthlyBudget ? (
          //予算が設定されていないとき
          <div className="flex flex-col justify-center items-center gap-3 text-gray-600">
            <TriangleAlert className="w-6 h-6 text-red-500" />
            <p>No budget has been set for this month.</p>
            <p className="text-sm text-gray-400">
              Please set your budget first.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-col items-center gap-3">
              <div className="flex items-center gap-1">
                <Wallet />
                <span>budget: {jpMoneyChange(monthlyBudget?.money ?? 0)}</span>
              </div>
              <div className="flex items-center gap-1">
                <CircleArrowDown />
                <span>used: {jpMoneyChange(totalMoney)}</span>
              </div>
              {isOver ? (
                <div className="flex items-center gap-1">
                  <TriangleAlert style={{ color: "#ff0000" }} />
                  <span className="text-[#ff0000]">
                    remain: {jpMoneyChange(remaining)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <CheckCheck style={{ color: "#0000cd" }} />
                  <span className="text-[#0000cd]">
                    remain: {jpMoneyChange(remaining)}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
