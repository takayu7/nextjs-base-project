"use client";
import { useRouter } from "next/navigation";
import { PiggyBank } from "lucide-react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-items-center ">
        <div className="flex gap-4 items-center flex-col">
          <PiggyBank color="pink" size={250} />
          <button
            className="rounded-2xl flex items-center justify-center bg-gray-500 text-white gap-2 h-14 px-20 text-lg"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
}
