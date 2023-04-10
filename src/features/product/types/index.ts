export type Supplier = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: 'penjualan' | 'pembelian';
  default?: boolean;
  supplier?: Supplier;
};

export type ProductRequest = {
  name: string;
  price: number;
  unit: string;
  category: 'penjualan' | 'pembelian';
  default?: boolean;
  supplier?: number;
};
