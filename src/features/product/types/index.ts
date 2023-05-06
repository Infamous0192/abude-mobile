import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Supplier = {
  name: string;
  description: string;
} & BaseEntity;

export type SupplierRequest = {
  name: string;
  description: string;
  company?: number;
};

export type SupplierQuery = {
  keyword?: string;
  company?: number;
} & Pagination;

export type Product = {
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'purchase' | 'sale';
  supplier?: Supplier;
} & BaseEntity;

export type ProductRequest = {
  name: string;
  description: string;
  price: number;
  unit: string;
  company: number;
  category?: 'purchase' | 'sale';
  supplier?: number;
};

export type ProductQuery = {
  keyword?: string;
  company?: number;
  category?: 'purchase' | 'sale';
} & Pagination;
