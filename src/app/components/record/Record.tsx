import { Tabs, TabsContent } from "@/components/ui/tabs";

import { TabsButton } from "@/app/components/molecules/TabsButton";
import { InputField } from "@/app/components/molecules/InputField";

export const Record = () => {
  return (
    <>
      <div className="w-[343px]">
        <div className="flex justify-center mt-3 flex-col items-center">
          <h1 className="text-maincolor text-xl font-bold font-mono ">
            2025.9.4
          </h1>
          <div className="flex max-w-full flex-col gap-6">
            <Tabs defaultValue="account" className="w-[276px]">
              <TabsButton />
              <TabsContent value="expense">
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="email"
                />
              </TabsContent>

              <TabsContent value="income">

              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
