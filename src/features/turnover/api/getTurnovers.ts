import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Turnover, TurnoverQuery } from '../types';

type TurnoversRequest = {
  params?: TurnoverQuery;
};

export async function getTurnovers({ params }: TurnoversRequest) {
  const res = await axios.get<PaginatedResult<Turnover>>(`/turnover`, { params });

  return res.data;
}

type QueryFnType = typeof getTurnovers;

type UseTurnoversOptions = {
  params?: TurnoverQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useTurnovers({ config, params }: UseTurnoversOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['turnovers', params],
    queryFn: () => getTurnovers({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteTurnovers({ params }: UseTurnoversOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['turnovers', params],
    queryFn: ({ pageParam: page = 1 }) => getTurnovers({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
