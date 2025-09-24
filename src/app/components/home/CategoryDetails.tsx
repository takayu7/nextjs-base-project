import { jpMoneyChange, categoryIcon } from "@/app/lib/utils";

export const categoryTestData = [
  {
    id: 1,
    category: "Housing",
    amount: 50000,
    color: "#FFA834",
    type: "expense",
  },
  {
    id: 2,
    category: "Hobby",
    amount: 50000,
    color: "#92D36E",
    type: "expense",
  },
  {
    id: 3,
    category: "Food",
    amount: 40000,
    color: "#75A9F9",
    type: "expense",
  },
  {
    id: 4,
    category: "Social",
    amount: 30000,
    color: "#E692F8",
    type: "expense",
  },
  {
    id: 5,
    category: "Utilities",
    amount: 14000,
    color: "#FEF67F",
    type: "expense",
  },
  {
    id: 6,
    category: "Daily goods",
    amount: 10000,
    color: "#FDBCA5",
    type: "expense",
  },
  {
    id: 7,
    category: "Medical",
    amount: 6000,
    color: "#7A7A7A",
    type: "expense",
  },
  {
    id: 8,
    category: "Salary",
    amount: 80000,
    color: "#FDACAC",
    type: "income",
  },
];

export const CategoryDetails = ({ type }) => {
  const newData = categoryTestData.filter((i) => i.type === type);
  return (
    <>
      <div>
        {newData.map((category) => {
          return (
            <ul key={category.id} className="flex flex-col">
              <li className="flex w-full items-center justify-between font-semibold text-gray-800 text-sm py-1">
                <div className="flex flex-row">
                 <span className="pr-3.5"> {categoryIcon(category.id, category.color, 24)}</span>
                  <p style={{ color: category.color }}>{category.category}</p>
                </div>
                <p className="text-[#444444]">
                  {jpMoneyChange(category.amount)}
                </p>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};
