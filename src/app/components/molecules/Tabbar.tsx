"use client";
import { House, Pencil, List, Flag } from "lucide-react";
import { useRouter } from "next/navigation";

export const Tabbar = () => {
    const router = useRouter();
  return (
    <>
      <div className="flex flex-row justify-between px-20 py-2 bg-pink-200">
        <div className="flex flex-col items-center hover:bg-gray-50" onClick={() => router.push("/home")}>
          <House />
          <p className="text-[11px]">Home</p>
        </div>
        <div className="flex flex-col items-center" onClick={() => router.push("/record")}>
          <Pencil />
          <p className="text-[11px]">Record</p>
        </div>
        <div className="flex flex-col items-center"  onClick={() => router.push("/history")}>
          <List />
          <p className="text-[11px]">History</p>
        </div>
        <div className="flex flex-col items-center" onClick={() => router.push("/goal")}>
          <Flag />
          <p className="text-[11px]">Goal</p>
        </div>
      </div>
    </>
  );
};
