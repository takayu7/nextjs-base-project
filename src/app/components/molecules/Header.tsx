import { PiggyBank } from "lucide-react";
import { IconSheet } from "@/app/components/molecules/IconSheet";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-15 pt-5">
      <IconSheet />
      <button>
        <PiggyBank className="w-[50px] h-[50px] text-[#F6A2BF]" />
      </button>
    </header>
  );
};
