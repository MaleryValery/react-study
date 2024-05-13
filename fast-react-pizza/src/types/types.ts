export type Menu = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};
export type ResponseData = {
  status: string;
  data: Menu[];
};
