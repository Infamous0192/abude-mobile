import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Wage, WageQuery } from '../../types';

type WagesRequest = {
  params?: WageQuery;
};

export async function getWages({ params }: WagesRequest) {
  const res = await axios.get<PaginatedResult<Wage>>(`/wage`, { params });

  return res.data;
}

type QueryFnType = typeof getWages;

type UseWagesOptions = {
  params?: WageQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useWages({ config, params }: UseWagesOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['wages', params],
    queryFn: () => getWages({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteWages({ params }: UseWagesOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['wages', { ...params, infinite: true }],
    queryFn: ({ pageParam: page = 1 }) => getWages({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
