import { ReactNode } from "react";

type ButtonGroupProps = {
  label: ReactNode;
  varient?:
    | "expense"
    | "income"
    | "budget"
    | "delete"
    | "expenseCategory"
    | "incomeCategory";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  label,
  varient = "expense",
  onClick,
}) => {
  return (
    <>
      <button
        className={
          varient === "expense"
            ? "btn rounded-[3px] bg-[#A8C6FA] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#75A9F9] w-[165px] h-[45px]"
            : varient === "income"
            ? "btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#F06E9C] w-[165px] h-[45px]"
            : varient === "budget"
            ? "btn rounded-[3px] bg-[#AAAAAA] text-white shadow-lg text-sm hover:bg-[#929292] w-[131px] h-[40px]"
            : varient === "delete"
            ? "btn rounded-[3px] bg-red-400 text-white w-[131px] h-[35px] hover:bg-red-300"
            : varient === "expenseCategory"
            ? "btn rounded-[3px] bg-[#A8C6FA] text-black hover:bg-[#75A9F9] w-[131px] h-[35px]"
            : varient === "incomeCategory"
            ? "btn rounded-[3px] bg-[#F6A2BF] text-black hover:bg-[#F06E9C] w-[131px] h-[35px]"
            : ""
        }
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};
