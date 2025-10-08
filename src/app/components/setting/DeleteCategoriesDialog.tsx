"use client";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonGroup } from "@/app/components/molecules/ButtonGroup";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Category } from "@/app/types/type";

export interface DeleteDialogProps {
  onDelete: (id: string) => void;
  categoryId: string;
}

export const DeleteCategoriesDialog: React.FC<DeleteDialogProps> = ({
  onDelete,
  categoryId,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(categories);
  return (
    <>
      <DialogTrigger className="hover:bg-gray-200 btn rounded-full">
        <Trash style={{ color: "#929292" }} />
      </DialogTrigger>
      <DialogContent className="w-[348px]">
        <DialogTitle className="flex items-center justify-center">
          <p>Delete this category?</p>
        </DialogTitle>
        <div className="flex justify-center">
          <ButtonGroup
            label="delete"
            varient="delete"
            onClick={() => onDelete(categoryId)}
          />
        </div>
      </DialogContent>
    </>
  );
};
