type ButtonGroupProps = {
  label: string;
  varient?: "expense" | "income";
  onClick?:(e: React.MouseEvent<HTMLInputElement>) => void
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
            ? "btn rounded-[3px] bg-[#A8C6FA] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#75A9F9] w-[165px] h-[47px]"
            : "btn rounded-[3px] bg-[#F6A2BF] text-white btn-xl btn-wide shadow-lg text-lg hover:bg-[#F06E9C] w-[165px] h-[47px]"
        }
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};
