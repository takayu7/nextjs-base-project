import { CircleUserRound, PiggyBank } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-15 pt-5">
      <button>
        <CircleUserRound className="w-[35px] h-[35px]" />
      </button>
      <button>
        <PiggyBank className="w-[50px] h-[50px] text-[#F6A2BF]" />
      </button>
    </header>
  );
};
