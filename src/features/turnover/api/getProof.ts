import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Proof } from '../types';

type ProofRequest = {
  id: number;
};

export async function getProof({ id }: ProofRequest) {
  const res = await axios.get<Proof>(`/handover/proof/${id}`);

  return res.data;
}

type QueryFnType = typeof getProof;

type UseProofOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useProof({ config, id }: UseProofOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['handover-proof', id],
    queryFn: () => getProof({ id }),
  });
}
