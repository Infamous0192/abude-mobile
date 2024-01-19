import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { HandoverProof } from '../types';

type HandoverProofDTO = {
  id: number;
};

export async function getHandoverProof({ id }: HandoverProofDTO) {
  const res = await axios.get<HandoverProof>(`/handover-proof/${id}`);

  return res.data;
}

type QueryFnType = typeof getHandoverProof;

type UseHandoverProofOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useHandoverProof({ config, id }: UseHandoverProofOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['handoverProof', id],
    queryFn: () => getHandoverProof({ id }),
  });
}
