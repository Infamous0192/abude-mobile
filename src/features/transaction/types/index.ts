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
  status: 'approved' | 'accepted' | 'canceled';
  note: string;
  total: number;
  user: User;
  items: SaleItem[];
  date: Date;
} & BaseEntity;

export type SaleRequest = {
  customer: string;
  note: string;
  source: 'outlet' | 'warehouse';
  sourceId: number;
  date: Date;
  items: Array<{
    price?: number;
    quantity: number;
    product: number;
  }>;
};

export type SaleQuery = {
  outlet?: number;
  status?: 'approved' | 'accepted' | 'canceled';
  startDate?: Date;
  endDate?: Date;
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
  code: string;
  note: string;
  total: number;
  items: PurchaseItem[];
  status: 'success' | 'canceled';
  user: User;
  date: Date;
} & BaseEntity;

export type PurchaseRequest = {
  note: string;
  source: 'outlet' | 'warehouse';
  sourceId: number;
  date: Date;
  items: Array<{
    price?: number;
    quantity: number;
    product: number;
    type: 'stock' | 'disposable';
  }>;
};

export type PurchaseQuery = {
  outlet?: number;
  startDate?: Date;
  endDate?: Date;
} & Pagination;

export type SalesSummary = {
  id: number;
  date: string;
  name: string;
  quantity: number;
  total: number;
};

export type SalesSummaryQuery = {
  status?: 'approved' | 'accepted' | 'canceled';
  outlet?: number;
  startDate?: Date;
  endDate?: Date;
};

export type PurchasesSummary = {
  id: number;
  date: string;
  name: string;
  quantity: number;
  total: number;
};

export type PurchasesSummaryQuery = {
  status?: 'success' | 'canceled';
  outlet?: number;
  startDate?: Date;
  endDate?: Date;
};
