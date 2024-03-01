import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { Proof, ProofQuery } from '../types';

type ProofsRequest = {
  params?: ProofQuery;
};

export async function getProofs({ params }: ProofsRequest) {
  const res = await axios.get<PaginatedResult<Proof>>(`/handover/proof`, { params });

  return res.data;
}

type QueryFnType = typeof getProofs;

type UseProofsOptions = {
  params?: ProofQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useProofs({ config, params }: UseProofsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['handover-proofs', params],
    queryFn: () => getProofs({ params }),
    placeholderData: keepPreviousData,
  });
}

export function useInfiniteProofs({ params }: UseProofsOptions = {}) {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['handover-proofs', params],
    queryFn: ({ pageParam: page = 1 }) => getProofs({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
