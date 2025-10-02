"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { useEffect, useState } from "react";

export const IconSheet = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<string>("");

  //ログイン情報取得
  const getUserInfo = () => {
    const currentName = sessionStorage.getItem("name") || "";
    const currentEmail = sessionStorage.getItem("email") || "";
    const currentBirthday = sessionStorage.getItem("birthday") || "";
    setUserName(currentName);
    setUserEmail(currentEmail);
    setUserBirthday(currentBirthday);
  };

  useEffect(() => {
    getUserInfo();

    // カスタムイベント監視
    const handler = () => getUserInfo();
    window.addEventListener("getUserInfo", handler);

    return () => {
      window.removeEventListener("getUserInfo", handler);
    };
  }, []);

  console.log("ログインユーザ:", userName, userEmail, userBirthday);

  //日付YYYY.MM.DD型に
  const birthday = new Date(userBirthday);
  const formatted = birthday
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join(".");

  console.log(birthday);
  console.log(formatted);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <CircleUserRound className="w-[50x] h-[50px]" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-1/2">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <p>{userName}</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Email</Label>
            <p>{userEmail}</p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-birthday">Birthday</Label>
            <p>{formatted}</p>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={() => router.push("/setting")}>
            <Settings />
            <p>setting</p>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
