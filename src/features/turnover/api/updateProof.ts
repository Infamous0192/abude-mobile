import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Proof, ProofDTO } from '../types';

type ProofUpdateRequest = {
  id: number;
  data: ProofDTO;
};

export async function updateProof({ id, data }: ProofUpdateRequest) {
  const res = await axios.put<GeneralResponse<Proof>>(`/handover/proof/${id}`, data);

  return res.data;
}

type UseUpdateProofOptions = {
  config?: MutationConfig<typeof updateProof>;
};

export function useUpdateProof({ config }: UseUpdateProofOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateProof,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['handover-proofs'] });
      queryClient.invalidateQueries({ queryKey: ['handover-proof'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
