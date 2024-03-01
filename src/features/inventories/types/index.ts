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

export type Category = {
  name: string;
  description: string;
} & BaseEntity;

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

export type Stock = {
  product: Product;
  category: Category;
  amount: number;
  totalValue: number;
  averagePrice: number;
};

export type StockQuery = {
  product?: number;
  outlet?: number;
} & Pagination;

export type StockSummary = {
  product: Product;
  available: number;
  totalValue: number;
  stockIn: number;
  valueIn: number;
  stockOut: number;
  valueOut: number;
};

export type Recapitulation = {
  awe: string;
};

export type RecapitulationDTO = {
  notes?: string;
  employee?: string;
  date?: Date;
  outlet?: number;
};
