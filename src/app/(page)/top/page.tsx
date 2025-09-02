// File: app/page.tsx
"use client";
import CommentForm from "@/app/components/CommentForm";
import Image from "next/image";

export default function Page() {
  const handleClick = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <CommentForm />
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <button
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          onClick={() => handleClick("/")}
        >
          <Image
            className="dark:invert"
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          TOP
        </button>
      </div>
    </div>
  );
}
