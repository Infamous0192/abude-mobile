import { User } from '@/features/auth';
import { Product } from '@/features/product';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type PurchaseStatus = 'approved' | 'accepted' | 'canceled';

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
  status: PurchaseStatus;
  user: User;
  date: Date;
} & BaseEntity;

export type PurchaseDTO = {
  note: string;
  source: 'outlet' | 'warehouse';
  sourceId: number;
  date: Date;
  supplier?: number;
  type?: 'debit' | 'credit';
  items: Array<{
    price?: number;
    quantity: number;
    product: number;
    type: 'stock' | 'disposable';
  }>;
};

export type PurchaseQuery = {
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
  status?: PurchaseStatus[];
} & Pagination;

export type PurchaseSummary = {
  id: number;
  date: string;
  name: string;
  quantity: number;
  total: number;
};

export type PurchaseSummaryQuery = {
  status?: PurchaseStatus[];
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
};
