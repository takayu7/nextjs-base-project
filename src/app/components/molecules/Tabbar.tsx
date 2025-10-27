"use client";
import { House, Pencil, List, Flag } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Tabbar = () => {
  const pathname = usePathname(); //現在のパスを取得
  const router = useRouter();

  const tabs = [
    { path: "/home", icon: House, label: "Home" },
    { path: "/record", icon: Pencil, label: "Record" },
    { path: "/history", icon: List, label: "History" },
    { path: "/goal", icon: Flag, label: "Goal" },
  ];

  return (
    <>
      <div className="flex flex-row justify-between px-20 py-2 bg-pink-200">
        {tabs.map((t) => {
          const nowPath = pathname === t.path;
          const Icon = t.icon;
          return (
            <div
              key={t.path}
              onClick={() => router.push(t.path)}
              className={cn(
                "flex flex-col items-center",
                nowPath ? "text-[#E93578] scale-110" : "text-gray-700"
              )}
            >
              <Icon className="w-5 h-5" />
              <p className="texy-[11px]">{t.label}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
