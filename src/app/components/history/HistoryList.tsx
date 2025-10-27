"use client";
import React, { useEffect, useState } from "react";
import { jpMoneyChange, categoryIcon } from "@/app/lib/utils";
import { PiPiggyBankDuotone } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { TypeIdProps, History } from "@/app/types/type";
import { Player } from "@lottiefiles/react-lottie-player";

export const HistoryList: React.FC<TypeIdProps> = () => {
  const [records, setRecords] = useState<Record<string, History[]>>({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

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

  return (
    <div className="pt-10">
      <div className="bg-pink-50 border border-pink-200 px-2 py-7 shadow-sm w-[318px] flex flex-col gap-4">
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
        ) : Object.entries(records).length === 0 ? (
          <p className="text-gray-400 text-center">no data</p>
        ) : (
          Object.entries(records).map(([date, items]) => (
            <div key={date} className="flex flex-col gap-1.5">
              {/* 日付 */}
              <h2 className="font-semibold text-gray-900 text-lg px-1">
                {date}
              </h2>

              {/* 履歴リスト */}
              {items.map((i) => (
                <ul
                  key={i.id}
                  className="flex flex-col bg-white px-3 py-3 border border-dashed border-pink-200 rounded-lg hover:bg-gray-100"
                  onClick={() => {
                    sessionStorage.setItem(
                      "selectedHistory",
                      JSON.stringify(i)
                    );
                    router.push("/edit");
                  }}
                >
                  <div className="flex justify-between items-center">
                    {/* 金額 */}
                    <li
                      className={`${
                        i.typeId === 1 ? "text-[#1464F6]" : "text-[#E93578]"
                      } text-[17px]`}
                    >
                      {i.typeId === 1
                        ? `ー${jpMoneyChange(i.money)}`
                        : `＋${jpMoneyChange(i.money)}`}
                    </li>

                    {/* カテゴリ  */}
                    <div className="flex flex-row items-center">
                      <li className="pr-1">
                        {categoryIcon(
                          Number(i.categoryId),
                          i.categoryColor,
                          18
                        )}
                      </li>
                      <li
                        style={{ color: i.categoryColor }}
                        className="text-[15px]"
                      >
                        {i.categoryName}
                      </li>
                    </div>
                  </div>

                  {/* メモ */}
                  {i.memo && (
                    <div className="flex flex-row justify-between ">
                      <PiPiggyBankDuotone className="w-[40px] h-[40px] text-[#F6A2BF]" />
                      <li className="relative w-[217px] h-[40px] rounded-lg bg-[#C0C0C0] text-sm px-4 py-1 text-white flex justify-center items-center">
                        {i.memo}
                        <div className="absolute z-10 left-[15px]">
                          <div className="rounded-sm before:absolute before:-top-2 before:-left-5 before:h-4 before:w-4 before:-rotate-45 before:transform before:bg-[#C0C0C0]" />
                        </div>
                      </li>
                    </div>
                  )}
                </ul>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
