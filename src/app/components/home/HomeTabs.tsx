"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { Player } from "@lottiefiles/react-lottie-player";
import { Category, TypeIdProps, History } from "@/app/types/type";
import { jpMoneyChange } from "@/app/lib/utils";

export const HomeTabs: React.FC<TypeIdProps> = ({ typeId }) => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [records, setRecords] = useState<History[]>([]);
  const [totalMoney, setTotalMoney] = useState<number>(0);

  //現在の月取得
  const today = new Date();
  const formatted = today
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
    })
    .split("/")
    .join(".");
  console.log(today);
  console.log(formatted);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // DBからデータ取得
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
  console.log(records);

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

  return (
    <div className="w-[350px]">
      <div className="flex justify-center mt-3 flex-col items-center gap-2">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          {formatted}
        </h1>
        <h1 className="text-2xl font-bold font-mono text-[#75A9F9]">
          {jpMoneyChange(totalMoney)}
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
                    {totalMoney === 0 ? (
                      <div className="flex items-center justify-center p-20">
                        <p>no data</p>
                      </div>
                    ) : (
                      <HomePieChart typeId={1} />
                    )}
                    <CategoryDetails typeId={1} />
                  </TabsContent>
                  
                  {/* 収入 */}
                  <TabsContent value="income">
                    {totalMoney === 0 ? (
                      <div className="flex items-center justify-center p-20">
                        <p>no data</p>
                      </div>
                    ) : (
                      <HomePieChart typeId={2} />
                    )}
                    <CategoryDetails typeId={2} />
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
