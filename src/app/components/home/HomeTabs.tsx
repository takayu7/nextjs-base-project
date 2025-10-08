import { Tabs, TabsContent } from "@/components/ui/tabs";

import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";

export const HomeTabs = () => {

  return (
    <div className="flex max-w-full flex-col gap-6">
      <Tabs defaultValue="expense" className="w-[350px]">
        <TabsButton />
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
      </Tabs>
    </div>
  );
};
