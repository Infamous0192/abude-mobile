import { User } from '@/features/auth';
import { Shift } from '@/features/employee';
import { Outlet } from '@/features/outlet';
import { Product } from '@/features/inventories';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type HandoverItem = {
  price: number;
  quantity: number;
  total: number;
  product: Product;
  date: Date;
};

export type Handover = {
  note: string;
  salesTotal: number;
  purchasesTotal: number;
  cashReceived: number;
  cashReturned: number;
  date: Date;
  sales: HandoverItem[];
  purchases: HandoverItem[];
  outlet: Outlet;
  shift: Shift;
  user: User;
} & BaseEntity;

export type HandoverRequest = {
  note: string;
  cashReceived: number;
  cashReturned: number;
  date: Date;
  outlet: number;
  shift: number;
};

export type HandoverQuery = {
  outlet?: number;
  shift?: number;
  startDate?: Date;
  endDate?: Date;
} & Pagination;
