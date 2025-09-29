import {
  TabsList,
  TabsTriggerLeft,
  TabsTriggerRight,
} from "@/components/ui/tabs";

export const TabsButton = () => {
  return (
    <div className="flex max-w-full flex-col gap-6 ">
        <TabsList className="flex items-center justify-center">
          <TabsTriggerLeft value="expense" className="text-sm h-[38px]">
            Expenses
          </TabsTriggerLeft>
          <TabsTriggerRight value="income" className="text-sm h-[38px]">
            Incomes
          </TabsTriggerRight> 
        </TabsList>
    </div>
  );
};
