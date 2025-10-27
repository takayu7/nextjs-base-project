"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/app/components/molecules/Header";
import { Tabbar } from "@/app/components/molecules/Tabbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // ヘッダーとタブバーを非表示
  const hideLayoutPaths = ["/createAccount", "/signin", "/"];
  const shouldHideLayout = hideLayoutPaths.includes(pathname);

  return (
    <>
      {!shouldHideLayout && (
        <div className="sticky top-0 z-50">
          <Header />
        </div>
      )}

      <div className="flex flex-1 justify-center px-4">{children}</div>

      {!shouldHideLayout && (
        <div className="sticky bottom-0 z-50">
          <Tabbar />
        </div>
      )}
    </>
  );
};
