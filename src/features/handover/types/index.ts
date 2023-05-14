import { User } from '@/features/auth';
import { Shift } from '@/features/employee';
import { Outlet } from '@/features/outlet';
import { Sale } from '@/features/transaction';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Handover = {
  note: string;
  salesTotal: number;
  cashReceived: number;
  cashReturned: number;
  date: Date;
  sales: Sale[];
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
