import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { InputField } from "@/app/components/molecules/InputField";
import { FolderHeart, BookHeart } from "lucide-react";
import { SelectedIcons } from "@/app/components/setting/SelectedIcons";

type AddCategoriesDialogProps = {
  varient?: "expense" | "income";
};

export const AddCategoriesDialog: React.FC<AddCategoriesDialogProps> = ({
  varient = "expense",
}) => {
  return (
    <>
      <DialogTrigger
        className={
          varient === "expense"
            ? "btn rounded-[3px] bg-[#D4E3FC] text-black btn-xl btn-wide shadow-lg text-sm hover:bg-[#A8C6FA] w-[171px] h-[32px]"
            : "btn rounded-[3px] bg-[#F6A2BF] text-black btn-xl btn-wide shadow-lg text-sm hover:bg-[#F06E9C] w-[171px] h-[32px]"
        }
      >
        add Category
      </DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogTitle className="flex justify-center">
          <p>add category</p>
        </DialogTitle>
        <div className="flex justify-center flex-col gap-2">
          <div className="flex flex-row items-center">
            <FolderHeart style={{ color: "#7A7A7A", width: "18px" }} />
            <InputField
              id="budget"
              type="text"
              placeholder="ex) hobby, beauty"
              varient="category"
              label="category name"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row pb-3">
              <BookHeart style={{ color: "#7A7A7A", width: "18px" }} />
              <span className="font-semibold text-[#7A7A7A] pl-0.5 pr-1">
                icon
              </span>
            </div>
            <SelectedIcons />
          </div>
          <div className="flex justify-center">
            {varient === "expense" ? (
              <ButtonGroup label="add" varient="expenseCategory" />
            ) : (
              <ButtonGroup label="add" varient="incomeCategory" />
            )}
          </div>
        </div>
      </DialogContent>
    </>
  );
};
