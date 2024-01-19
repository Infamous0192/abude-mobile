import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { HandoverProof } from '../types';

type HandoverProofDeleteDTO = {
  id: number;
};

export async function deleteHandoverProof({ id }: HandoverProofDeleteDTO) {
  const res = await axios.delete<GeneralResponse<HandoverProof>>(`/handover-proof/${id}`);

  return res.data;
}

type UseDeleteHandoverProofOptions = {
  config?: MutationConfig<typeof deleteHandoverProof>;
};

export function useDeleteHandoverProof({ config }: UseDeleteHandoverProofOptions = {}) {
  return useMutation(deleteHandoverProof, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['handover-proof']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
