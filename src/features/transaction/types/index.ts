import { User } from '@/features/auth';
import { Product } from '@/features/product';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type SaleItem = {
  id: number;
  price: number;
  quantity: number;
  total: number;
  product: Product;
};

export type Sale = {
  code: string;
  customer: string;
  note: string;
  total: number;
  status: 'approved' | 'accepted' | 'canceled';
  items: SaleItem[];
} & BaseEntity;

export type SaleRequest = {
  customer: string;
  note: string;
  source: 'outlet' | 'warehouse';
  sourceId: number;
  items: Array<{
    price?: number;
    quantity: number;
    product: number;
  }>;
};

export type SaleQuery = {
  outlet?: number;
  status?: 'approved' | 'accepted' | 'canceled';
} & Pagination;

export type PurchaseItem = {
  id: number;
  price: number;
  quantity: number;
  total: number;
  type: 'stock' | 'disposable';
  product: Product;
};

export type Purchase = {
  note: string;
  total: number;
  items: PurchaseItem[];
  user: User;
} & BaseEntity;

export type PurchaseRequest = {
  note: string;
  source: 'outlet' | 'warehouse';
  sourceId: number;
  items: Array<{
    price?: number;
    quantity: number;
    product: number;
    type: 'stock' | 'disposable';
  }>;
};

export type PurchaseQuery = {
  outlet?: number;
} & Pagination;

export type SalesSummary = {
  date: string;
  name: string;
  quantity: number;
  total: number;
};

export type SalesSummaryQuery = {
  status?: 'approved' | 'accepted' | 'canceled';
  outlet?: number;
  date?: string; // string date
};
