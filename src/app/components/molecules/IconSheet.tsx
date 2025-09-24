"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound, Settings } from "lucide-react";
import { getComments } from "@/app/api/Comments";

export const IconSheet = () => {
  const profileTestData = [
    {
      user_id: 1,
      name: "Donald",
      password: "d0903",
      address: "donald@co.jp",
      birthday: "2002-09-03",
    },
    // {user_id: , name: , password: , address: , birthday: ,},
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <CircleUserRound className="w-[50x] h-[50px]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2">
        <SheetHeader>
          <SheetTitle>profile</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <p>{profileTestData[0].name}</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <p>{profileTestData[0].address}</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-birthday">Birthday</Label>
            <p>{profileTestData[0].birthday}</p>
          </div>
        </div>
        <SheetFooter>
          <Button>
            <Settings />
            <p>setting</p>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
