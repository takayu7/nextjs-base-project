"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TabsButton } from "@/app/components/molecules/TabsButton";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { CategoriesList } from "@/app/components/setting/CategoriesList";
import { AddCategoriesDialog } from "@/app/components/setting/AddCategoriesDialog";
import { Dialog } from "@radix-ui/react-dialog";

export const CategoriesSetting = () => {
  return (
    <>
      <div className="w-[350px]">
        <div className="flex justify-center pt-5 flex-col items-center">
          <h1 className="text-maincolor text-2xl font-bold font-mono pb-5">
            Setting
          </h1>
          <div className="bg-white border border-[#F06E9C] border-dashed rounded-[8px] pb-10 shadow-sm w-[350px] flex flex-col gap-1.5">
            <p className="flex justify-center bg-[#FAD2E0] text-sm py-4 ">
              Edit & Add Categories
            </p>
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="account" className="px-3">
                <div className="px-6">
                <TabsButton />
                </div>
                {/* 支出 */}
                <TabsContent value="expense">
                  <CategoriesList varient="expense" />
                  <div className="flex justify-center pt-10">
                   <Dialog>
                    <AddCategoriesDialog varient="expense"/>
                    </Dialog>
                  </div>
                </TabsContent>
                {/* 収入 */}
                <TabsContent value="income">
                  <CategoriesList varient="income" />
                  <div className="flex justify-center pt-10">
                   <Dialog>
                    <AddCategoriesDialog varient="income"/>
                    </Dialog>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
