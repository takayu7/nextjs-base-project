"use client";
import { useRouter } from "next/navigation";
import { PiPiggyBankDuotone } from "react-icons/pi";

export default function Page() {
  const router = useRouter();

  return (
    <div className="font-sans grid items-center justify-items-center">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-items-center min-h-screen">
        <div className="flex gap-4 items-center flex-col pt-40">
          <PiPiggyBankDuotone color="pink" size={250} />
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
