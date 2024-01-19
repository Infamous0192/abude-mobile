import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { HandoverProof, HandoverProofRequest } from '../types';

export type UpdateHandoverProofDTO = {
  id: number;
  data: HandoverProofRequest;
};

export async function updateHandoverProof({ id, data }: UpdateHandoverProofDTO) {
  const res = await axios.put<GeneralResponse<HandoverProof>>(`/handover-proof/${id}`, data);

  return res.data;
}

type UseUpdateHandoverProofOptions = {
  config?: MutationConfig<typeof updateHandoverProof>;
};

export function useUpdateHandoverProof({ config }: UseUpdateHandoverProofOptions = {}) {
  return useMutation(updateHandoverProof, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['handoverProofs']);
      queryClient.invalidateQueries(['handoverProof', args[1].id]);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
