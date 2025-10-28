// "use client";
// import { categoryIcon } from "@/app/lib/utils";
// import React, { useEffect, useState, useTransition } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog } from "@radix-ui/react-dialog";
// import { Category, Type } from "@/app/types/type";
// import { DeleteCategoriesDialog } from "@/app/components/setting/DeleteCategoriesDialog";

// type CategoriesListProps = {
//   typeId: Type["id"];
// };

// export const CategoriesList: React.FC<CategoriesListProps> = ({ typeId }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         console.log("データ:", data);
//         setCategories(data);
//       } catch (error) {
//         console.error("失敗:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const newData = categories.filter((i) => i.typeId === typeId);
//   console.log(categories);
//   console.log(newData);
//   console.log(typeId);

//   //カテゴリ削除
//   const onDelete = async (id: string) => {
//     const res = await fetch("/api/categories", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id: id }),
//       cache: "no-store",
//     });
//     const data = await res.json();
//     console.log("Response text:", data);
//     //カテゴリ一覧を再取得してstateを更新
//     const updated = await fetch("/api/categories");
//     const updatedData = await updated.json();
//     setCategories(updatedData);
//     console.log(categories);
//   };

//   //削除ダイアログの保存処理
//   const handleDelete = (id: string) => {
//     startTransition(() => {
//       onDelete(id);
//     });
//   };

//   return (
//     <>
//       <ul className="space-y-2 pt-3">
//         {newData.map((c) => (
//           <li
//             key={c.id}
//             value={c.id}
//             className="flex flex-row border-2 rounded-[5px] items-center p-1 justify-between hover:bg"
//             style={{ borderColor: c.color }}
//           >
//             <div className="flex flex-row pl-2 gap-5 items-center">
//               <span className="text-xs">
//                 {categoryIcon(Number(c.id), c.color, 20)}
//               </span>
//               <span style={{ color: c.color }} className="text-[15px]">
//                 {c.name}
//               </span>
//             </div>
//             <span className="flex">
//               <Dialog>
//                 <DeleteCategoriesDialog
//                   onDelete={(id: string) => {
//                     handleDelete(id);
//                   }}
//                   categoryId={c.id}
//                 />
//               </Dialog>
//             </span>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };
