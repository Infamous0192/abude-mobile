import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Purchase, PurchaseQuery } from '../../types';

type PurchasesRequest = {
  params?: PurchaseQuery;
};

export async function getPurchases({ params }: PurchasesRequest) {
  const res = await axios.get<PaginatedResult<Purchase>>(`/purchase`, { params });

  return res.data;
}

type QueryFnType = typeof getPurchases;

type UsePurchasesOptions = {
  params?: PurchaseQuery;
  config?: QueryConfig<QueryFnType>;
};

export function usePurchases({ config, params }: UsePurchasesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['purchases', params],
    queryFn: () => getPurchases({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfinitePurchases({ params }: UsePurchasesOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['purchases', { ...params, infinite: true }],
    queryFn: ({ pageParam: page = 1 }) => getPurchases({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
