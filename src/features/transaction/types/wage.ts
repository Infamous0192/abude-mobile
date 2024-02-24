import { Account } from '@/features/account';
import { Company } from '@/features/company';
import { Outlet } from '@/features/outlet';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type WageStatus = 'accepted' | 'approved' | 'canceled';

export type Wage = {
  code: string;
  amount: number;
  type: 'debit' | 'credit';
  status: WageStatus;
  date: Date;
  notes: string;
  company?: Company;
  outlet: Outlet;
  account: Account;
} & BaseEntity;

export type WageDTO = {
  amount?: number | null;
  type?: 'debit' | 'credit' | null;
  date?: Date;
  notes?: string;
  account?: number | null;
  company?: number;
  outlet?: number;
};

export type WageQuery = {
  status?: WageStatus[];
  account?: number | string;
  company?: number | string;
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
} & Pagination;
