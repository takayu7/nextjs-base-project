import { Tabs, TabsContent } from "@/components/ui/tabs";

import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";

export const HomeTabs = () => {
  const chartExpensesData = [
    { browser: "Housing", visitors: 220, fill: "#FDCDAC" },
    { browser: "Hobby", visitors: 220, fill: "#E6F5C9" },
    { browser: "Food", visitors: 187, fill: "#CBD5E8" },
    { browser: "Social", visitors: 125, fill: "#F4CAE4" },
    { browser: "Utilities", visitors: 90, fill: "#FFF2AE" },
    { browser: "Daily goods", visitors: 50, fill: "#F1E2CC" },
    { browser: "Medical", visitors: 20, fill: "#CCCCCC" },
  ];

  const chartIncomesData = [
    { browser: "Salary", visitors: 80000, fill: "#FDACAC" },
  ];

  return (
    <div className="flex max-w-full flex-col gap-6">
      <Tabs defaultValue="account" className="w-[350px]">
        <TabsButton />
        {/* 支出 */}
        <TabsContent value="expense">
          <HomePieChart data={chartExpensesData} />
          <CategoryDetails type="expense" />
        </TabsContent>
        {/* 収入 */}
        <TabsContent value="income">
          <HomePieChart data={chartIncomesData} />
          <CategoryDetails type="income" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
