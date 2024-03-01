import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Recapitulation, RecapitulationQuery } from '../types';

type RecapitulationsRequest = {
  params?: RecapitulationQuery;
};

export async function getRecaps({ params }: RecapitulationsRequest) {
  const res = await axios.get<PaginatedResult<Recapitulation>>(`/inventory/recapitulation`, {
    params,
  });

  return res.data;
}

type QueryFnType = typeof getRecaps;

type UseRecapsOptions = {
  params?: RecapitulationQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useRecaps({ config, params }: UseRecapsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['recapitulations', params],
    queryFn: () => getRecaps({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteRecaps({ params }: UseRecapsOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['recapitulations', params],
    queryFn: ({ pageParam: page = 1 }) => getRecaps({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
