export type User = {
  id: string;
  name: string;
  password: string;
  address: string;
  birthday: string;
};

export type Type = {
  id: number;
  name: string;
};

export type Category = {
  id: string;
  typeId: number;
  name: string;
  color: string;
  icon: string;
};
