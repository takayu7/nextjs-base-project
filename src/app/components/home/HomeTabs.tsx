"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { TypeIdProps, History } from "@/app/types/type";
import { jpMoneyChange } from "@/app/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const HomeTabs: React.FC<TypeIdProps> = ({ typeId }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [records, setRecords] = useState<History[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState("");

  //現在の月取得
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    setSelectedMonth(`${year}-${month}`);
  }, []);

  // 月を変更する関数
  const changeMonth = (direction: "prev" | "next") => {
    //"-"で分割、数値に変換（year = 2025, month = 10）
    const [year, month] = selectedMonth.split("-").map(Number);
    //new Dateの第二引数は０始まりの月
    const date = new Date(year, month - 1 + (direction === "next" ? 1 : -1));
    const newYear = date.getFullYear();
    //０始まりの月を+１して元に戻し、yyyy-MMの形に
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    setSelectedMonth(`${newYear}-${newMonth}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // DBから支出・収入データ取得
  useEffect(() => {
    // ユーザーIDをセッションストレージから取得
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(Number(id));
    }
    if (!userId || userId === 0) return;
    setLoading(true);
    fetch(`/api/histories/${userId}`)
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .finally(() => setLoading(false));
  }, [userId]);

  // recordsを配列に
  const allRecords = Object.values(records).flat();

  // 指定月・タイプ別データ
  const monthlyData = allRecords.filter((r) => {
    const recordDate = new Date(r.date);
    const year = recordDate.getFullYear();
    const month = String(recordDate.getMonth() + 1).padStart(2, "0");
    const recordMonth = `${year}-${month}`;
    return recordMonth === selectedMonth && (r.typeId === 2) === (typeId === 2);
  });

  // 月ごとの合計を計算
  useEffect(() => {
    const expense = monthlyData
      .filter((r) => r.typeId === 1)
      .reduce((sum, r) => sum + r.money, 0);
    const income = monthlyData
      .filter((r) => r.typeId === 2)
      .reduce((sum, r) => sum + r.money, 0);

    setTotalExpense(expense);
    setTotalIncome(income);
  }, [monthlyData]);

  return (
    <div className="w-[350px]">
      <div className="flex justify-center mt-3 flex-col items-center gap-2">
        <div className="flex flex-row items-center gap-3">
          <button onClick={() => changeMonth("prev")}>
            <ChevronLeft />
          </button>
          <h1 className="text-maincolor text-xl font-bold font-mono ">
            {selectedMonth.replace("-", ".")}
          </h1>
          <button>
            <ChevronRight onClick={() => changeMonth("next")} />
          </button>
        </div>
        <h1 className="text-2xl font-bold font-mono text-[#75A9F9]">
          {jpMoneyChange(totalExpense)}
        </h1>
      </div>

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
        <div className="flex justify-center items-center">
          <div className="flex max-w-full flex-col gap-6">
            <Tabs defaultValue="expense" className="w-[350px]">
              <TabsButton />
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
                <>
                  {/* 支出 */}
                  <TabsContent value="expense">
                    {totalExpense === 0 ? (
                      <div className="flex items-center justify-center p-20">
                        <p>no data</p>
                      </div>
                    ) : (
                      <HomePieChart typeId={1} selectedMonth={selectedMonth} />
                    )}
                    <CategoryDetails typeId={1} selectedMonth={selectedMonth} />
                  </TabsContent>

                  {/* 収入 */}
                  <TabsContent value="income">
                    {totalIncome === 0 ? (
                      <div className="flex items-center justify-center p-20">
                        <p>no data</p>
                      </div>
                    ) : (
                      <HomePieChart typeId={2} selectedMonth={selectedMonth} />
                    )}
                    <CategoryDetails typeId={2} selectedMonth={selectedMonth} />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};
