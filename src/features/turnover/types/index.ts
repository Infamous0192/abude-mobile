import { Outlet } from '@/features/outlet';
import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Turnover = {
  date: Date;
  evidence: string;
  income?: number;
  expense?: number;
  outlet: Outlet;
} & BaseEntity;

export type TurnoverRequest = {
  date?: Date | string;
  evidence?: string;
  outlet?: number | string;
};

export type TurnoverQuery = {
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
} & Pagination;
