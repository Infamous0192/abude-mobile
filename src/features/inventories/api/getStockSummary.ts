import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { StockSummary, StockQuery } from '../types';

type StockSummaryRequest = {
  params?: StockQuery;
};

export async function getStockSummary({ params }: StockSummaryRequest) {
  const res = await axios.get<StockSummary[]>(`/inventory/summary`, { params });

  return res.data;
}

type QueryFnType = typeof getStockSummary;

type UseStockSummaryOptions = {
  params?: StockQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useStockSummary({ config, params }: UseStockSummaryOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['stock-summary', params],
    queryFn: () => getStockSummary({ params }),
  });
}
