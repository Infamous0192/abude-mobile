export type Supplier = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  default: boolean;
  supplier: Supplier;
};
