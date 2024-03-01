import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Proof } from '../types';

type ProofDeleteRequest = {
  id: number;
};

export async function deleteProof({ id }: ProofDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Proof>>(`/handover/proof/${id}`);

  return res.data;
}

type UseDeleteProofOptions = {
  config?: MutationConfig<typeof deleteProof>;
};

export function useDeleteProof({ config }: UseDeleteProofOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteProof,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['handover-proof'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
