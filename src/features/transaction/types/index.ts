import { Product } from '@/features/product';

export type TransactionItem = {
  product: Product;
  price: number;
  amount: number;
  total: number;
};

export type Transaction = {
  customer: string;
  code: string;
  total: string;
  category: 'pembelian' | 'penjualan';
  note: string;
  items: TransactionItem[];
};
