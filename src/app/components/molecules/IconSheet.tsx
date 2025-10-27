"use client";
import { useRouter, usePathname } from "next/navigation";
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
import { useEffect, useState, useCallback } from "react";

export const IconSheet = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userBirthday, setUserBirthday] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  const pathname = usePathname(); //現在のパスを取得

  //ログイン情報取得
  const getUserInfo = () => {
    const currentName = sessionStorage.getItem("name") || "";
    const currentEmail = sessionStorage.getItem("email") || "";
    const currentBirthday = sessionStorage.getItem("birthday") || "";
    setUserName(currentName);
    setUserEmail(currentEmail);
    setUserBirthday(currentBirthday);
  };

  // ユーザーIDをセッションストレージから取得
  const updateHeaderInfo = useCallback(() => {
    const storedId = sessionStorage.getItem("userId") || "0";
    setUserId(Number(storedId));
  }, []);

  console.log(userId);
  console.log(isLoading);

  //再ログイン時にuserIdの値を更新する
  useEffect(() => {
    updateHeaderInfo();
    getUserInfo();
    // カスタムイベント監視
    const handler = () => getUserInfo();
    window.addEventListener("headerUpdate", handler);
    return () => {
      window.removeEventListener("headerUpdate", handler);
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

  // ナビゲーション処理
  const handleNavigation = (href: string) => {
    if (href !== pathname) {
      sessionStorage.clear(); 
      window.dispatchEvent(new Event("headerUpdate"));
      setIsLoading(true);
      setIsOpen(false);
      router.push(href);
    }
  };

  // pathnameが変わったらローディングを止める
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <Button onClick={() => handleNavigation("/")}>
            <Settings />
            <p>Sign out</p>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
