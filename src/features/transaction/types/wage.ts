import { Company } from '@/features/company';
import { Employee } from '@/features/employee';
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
  employee: Employee;
} & BaseEntity;

export type WageDTO = {
  amount?: number | null;
  type?: 'debit' | 'credit' | null;
  date?: Date;
  notes?: string;
  employee?: number | null;
  company?: number;
  outlet?: number;
};

export type WageQuery = {
  status?: WageStatus[];
  employee?: number | string;
  company?: number | string;
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
} & Pagination;
