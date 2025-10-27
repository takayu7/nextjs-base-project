import { IconSheet } from "@/app/components/molecules/IconSheet";
import { BudgetRemainingDialog } from "@/app/components/home/BudgetRemainingDialog";
import { Dialog } from "@/components/ui/dialog";

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 pt-5">
      <IconSheet />
      <Dialog>
        <BudgetRemainingDialog typeId={1} />
      </Dialog>
    </header>
  );
};
