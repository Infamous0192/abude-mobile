import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Stock, StockQuery } from '../types';

type StocksRequest = {
  params?: StockQuery;
};

export async function getStocks({ params }: StocksRequest) {
  const res = await axios.get<PaginatedResult<Stock>>(`/inventory/stock`, { params });

  return res.data;
}

type QueryFnType = typeof getStocks;

type UseStocksOptions = {
  params?: StockQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useStocks({ config, params }: UseStocksOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['stocks', params],
    queryFn: () => getStocks({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteStocks({ params }: UseStocksOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['stocks', params],
    queryFn: ({ pageParam: page = 1 }) => getStocks({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
