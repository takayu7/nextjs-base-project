import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { Trash } from "lucide-react";

export const DeleteCategoriesDialog = () => {
  return (
    <>
      <DialogTrigger className="hover:bg-gray-200 btn rounded-full">
        <Trash style={{ color: "#929292" }} />
      </DialogTrigger>
      <DialogContent className="w-[348px]">
        <DialogTitle className="flex items-center justify-center">
          <p>Delete this category?</p>
        </DialogTitle>
        <button>
            
        </button>
      </DialogContent>
    </>
  );
};
