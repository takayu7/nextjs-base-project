export type User = {
  id: string;
  name: string;
  password: string;
  address: string;
  birthday: Date | null;
};

export type Type = {
  id: number;
  name: string;
};

export type TypeIdProps = {
  typeId: Type["id"];
};

export type Category = {
  id: number;
  typeId: number;
  name: string;
  color: string;
  icon: string;
};

export type History = {
  id: string;
  typeId: number;
  userId: string;
  categoryId: number;
  money: number;
  date: Date;
  memo: string;
  categoryName: string;
  categoryColor: string;
  categoryIcon: string;
};

export type Record = {
  id: string;
  typeId: number;
  userId: string;
  categoryId: number;
  money: number;
  date: Date;
  memo: string;
};
