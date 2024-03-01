import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Proof, ProofDTO } from '../types';

type ProofCreateRequest = {
  data: ProofDTO;
};

export async function createProof({ data }: ProofCreateRequest) {
  const res = await axios.post<GeneralResponse<Proof>>(`/handover/proof`, data);

  return res.data;
}

type UseCreateProofOptions = {
  config?: MutationConfig<typeof createProof>;
};

export function useCreateProof({ config }: UseCreateProofOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createProof,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['handover-proofs'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
