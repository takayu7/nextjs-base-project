import {
  Utensils,
  House,
  Star,
  ShoppingCart,
  Flame,
  BriefcaseMedical,
  Handshake,
} from "lucide-react";
import {jpMoneyChange} from "@/app/lib/utils"

export const CategoryDetails = () => {
  const categoryTestData = [
    { id: 1, icon: House, category: "Housing", amount: 50000, color: "#FFA834"},
    { id: 2, icon: Star, category: "Hobby", amount: 50000, color:"#92D36E"  },
    { id: 3, icon: Utensils, category: "Food", amount: 40000, color: "#75A9F9"},
    { id: 4, icon: Handshake, category: "Social", amount: 30000, color: "#E692F8"},
    { id: 5, icon: Flame, category: "Utilities", amount: 14000, color:"#FEF67F" },
    { id: 6, icon: ShoppingCart, category: "Daily goods", amount: 10000, color:"#FDBCA5" },
    { id: 7, icon: BriefcaseMedical, category: "Medical", amount: 6000, color:"#7A7A7A" },
  ];
  return (
    <>
      <div>
        {categoryTestData.map((category) => (
          <ul key={category.id} className="flex flex-col ">
            <li className="flex w-full items-center justify-between font-semibold text-gray-800 text-sm py-1">
              <div className="flex flex-row">
                <category.icon style={{color:category.color}} className="pr-1.5"/>
                <p style={{color:category.color}}>{category.category}</p>
              </div>
              <p className="text-[#444444]">{jpMoneyChange(category.amount)}</p>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};
