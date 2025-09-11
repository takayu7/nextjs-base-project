import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";

import { HomePieChart } from "@/app/components/home/PieChart";
import { CategoryDetails } from "@/app/components/home/CategoryDetails";
import { TabsButton } from "@/app/components/molecules/TabsButton";

export const HomeTabs = () => {
  return (
    <div className="flex max-w-full flex-col gap-6">
      <Tabs defaultValue="account" className="w-[276px]">
        <TabsButton/>
        {/* 支出 */}
        <TabsContent value="expense">
          <HomePieChart />
          <CategoryDetails />
        </TabsContent>
        {/* 収入 */}
        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
