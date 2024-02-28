import { Pagination } from '@/types/api';
import { BaseEntity } from '@/types/entity';

export type Supplier = {
  name: string;
  description: string;
} & BaseEntity;

export type SupplierDTO = {
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
  type: 'purchase' | 'sale';
  isDefault: boolean;
} & BaseEntity;

export type ProductDTO = {
  name: string;
  description: string;
  price: number;
  unit: string;
  company: number;
  type?: 'purchase' | 'sale';
  isDefault: boolean;
};

export type ProductQuery = {
  keyword?: string;
  company?: number;
  type?: 'purchase' | 'sale';
} & Pagination;
