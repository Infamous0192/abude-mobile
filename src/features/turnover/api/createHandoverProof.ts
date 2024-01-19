import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { HandoverProof, HandoverProofRequest } from '../types';

type HandoverProofCreateDTO = {
  data: HandoverProofRequest;
};

export async function createHandoverProof({ data }: HandoverProofCreateDTO) {
  const res = await axios.post<GeneralResponse<HandoverProof>>(`/handover-proof`, data);

  return res.data;
}

type UseCreateHandoverProofOptions = {
  config?: MutationConfig<typeof createHandoverProof>;
};

export function useCreateHandoverProof({ config }: UseCreateHandoverProofOptions = {}) {
  return useMutation(createHandoverProof, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['handoverProofs']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
