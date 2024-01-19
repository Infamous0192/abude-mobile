import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { PaginatedResult } from '@/types/api';

import { HandoverProof, HandoverProofQuery } from '../types';

type HandoverProofsDTO = {
  params?: HandoverProofQuery;
};

export async function getHandoverProofs({ params }: HandoverProofsDTO) {
  const res = await axios.get<PaginatedResult<HandoverProof>>(`/handover-proof`, { params });

  return res.data;
}

type QueryFnType = typeof getHandoverProofs;

type UseHandoverProofsOptions = {
  params?: HandoverProofQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useHandoverProofs({ config, params }: UseHandoverProofsOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['handoverProofs', params],
    queryFn: () => getHandoverProofs({ params }),
    keepPreviousData: true,
  });
}

export function useInfiniteHandoverProofs({ params }: UseHandoverProofsOptions = {}) {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['handoverProofs', params],
    queryFn: ({ pageParam: page = 1 }) => getHandoverProofs({ params: { ...params, page } }),
    getNextPageParam: ({ metadata }) => (metadata.hasNext ? metadata.page + 1 : undefined),
    getPreviousPageParam: ({ metadata }) => (metadata.hasPrev ? metadata.page - 1 : undefined),
  });
}
