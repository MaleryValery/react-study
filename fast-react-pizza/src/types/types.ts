export type Menu = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};
export type ResponseData<T> = {
  status: string;
  data: T;
};
export type ErrorResponse = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: {};
};
export type FormData = {
  customer: string;
  phone: string;
  address: string;
  priority?: string;
  cart: string;
};
export type Order = FormData & {
  id: string;
  status?: string;
  estimatedDelivery?: string;
  cart: Cart[];
  position?: string;
  orderPrice?: number;
  priorityPrice?: number;
};

export type Cart = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
