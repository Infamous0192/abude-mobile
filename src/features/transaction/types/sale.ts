import { User } from '@/features/auth';
import { Product } from '@/features/product';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type SaleStatus = 'approved' | 'accepted' | 'canceled';

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
  status: SaleStatus;
  note: string;
  total: number;
  user: User;
  items: SaleItem[];
  date: Date;
} & BaseEntity;

export type SaleDTO = {
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
  outlet?: number | string;
  status?: SaleStatus[];
  startDate?: Date;
  endDate?: Date;
} & Pagination;

export type SaleSummary = {
  id: number;
  date: string;
  name: string;
  quantity: number;
  total: number;
};

export type SaleSummaryQuery = {
  status?: SaleStatus[];
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
};
