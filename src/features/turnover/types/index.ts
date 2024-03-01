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

export type TurnoverDTO = {
  date?: Date | string;
  evidence?: string;
  outlet?: number | string;
};

export type TurnoverQuery = {
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
} & Pagination;

export type Proof = {
  date: Date;
  evidence: string;
  outlet: Outlet;
} & BaseEntity;

export type ProofDTO = {
  date?: Date | string;
  evidence?: string;
  outlet?: number | string;
};

export type ProofQuery = {
  outlet?: number | string;
  startDate?: Date;
  endDate?: Date;
} & Pagination;
