import { Tabs, TabsContent } from "@/components/ui/tabs";

import { TabsButton } from "@/app/components/molecules/TabsButton";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { FormField } from "@/app/components/record/FormField";

export const Record = () => {
  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center mt-3 flex-col items-center">
          <h1 className="text-maincolor text-xl font-bold font-mono ">
            2025.9.4
          </h1>
          <div className="flex max-w-full flex-col gap-6">
            <Tabs defaultValue="account" className="w-[350px]">
              <TabsButton />

              {/* 支出 */}
              <TabsContent value="expense">
                <FormField varient="expense" />
                <div className="flex items-center justify-center pt-25">
                  <ButtonGroup label="Save" varient="expense" />
                </div>
              </TabsContent>

              {/* 収入 */}
              <TabsContent value="income">
                <FormField varient="income" />
                <div className="flex items-center justify-center pt-25">
                  <ButtonGroup label="Save" varient="income" />
                </div>
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
