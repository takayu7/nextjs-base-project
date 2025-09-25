import { categoryTestData } from "@/app/components/home/CategoryDetails";
import { categoryIcon } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { DeleteCategoriesDialog } from "@/app/components/setting/DeleteCategoriesDialog";

type CategoriesListProps = {
  varient?: "expense" | "income";
};

export const CategoriesList: React.FC<CategoriesListProps> = ({
  varient = "expense",
}) => {
  const newData = categoryTestData.filter((i) => i.type === varient);

  return (
    <>
      <ul className="space-y-2 pt-3">
        {newData.map((c) => (
          <li
            key={c.id}
            value={c.id}
            className="flex flex-row border-2 rounded-[5px] items-center p-1 justify-between hover:bg"
            style={{ borderColor: c.color }}
          >
            <div className="flex flex-row pl-2 gap-5 items-center">
              <span className="text-xs">{categoryIcon(c.id, c.color, 20)}</span>
              <span style={{ color: c.color }} className="text-[15px]">
                {c.category}
              </span>
            </div>
            <span className="flex">
              <Dialog>
                <DeleteCategoriesDialog />
              </Dialog>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
