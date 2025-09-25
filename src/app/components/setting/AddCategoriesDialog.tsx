import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";

export const AddCategoriesDialog = () => {
  return (
    <>
      <DialogTrigger className="btn rounded-[3px] bg-[#D4E3FC] text-black btn-xl btn-wide shadow-lg text-sm hover:bg-[#F06E9C] w-[171px] h-[32px]">
        add Category
      </DialogTrigger>
      <DialogContent className="w-[348px]">
        <DialogTitle className="flex items-center">
          <p>add category</p>
        </DialogTitle>
      </DialogContent>
    </>
  );
};
