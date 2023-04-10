import { Product } from '@/features/product';

export type TransactionItem = {
  id: number;
  product: Product;
  price: number;
  amount: number;
  total: number;
};

export type Transaction = {
  id: number;
  customer: string;
  code: string;
  total: number;
  category: 'pembelian' | 'penjualan';
  note: string;
  items: TransactionItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionRequest = {
  customer: string;
  note: string;
  category: 'pembelian' | 'penjualan';
  items: {
    amount: number;
    product: number;
    price?: number;
  }[];
};

export type TransactionQuery = {
  category?: 'pembelian' | 'penjualan';
};
