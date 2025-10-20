"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { Player } from "@lottiefiles/react-lottie-player";

export const HomeTabs = () => {
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-[350px]">
      <div className="flex justify-center mt-3 flex-col items-center gap-2">
        <h1 className="text-maincolor text-xl font-bold font-mono ">
          {formatted}
        </h1>
        <h1 className="text-2xl font-bold font-mono text-[#F06E9C]">
          ¥200,000
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
                    <HomePieChart typeId={1} />
                    <CategoryDetails typeId={1} />
                  </TabsContent>
                  {/* 収入 */}
                  <TabsContent value="income">
                    <HomePieChart typeId={2} />
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
