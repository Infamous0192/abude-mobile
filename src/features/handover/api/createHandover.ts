import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Handover, HandoverRequest } from '../types';

type HandoverCreateDTO = {
  data: HandoverRequest;
};

export async function createHandover({ data }: HandoverCreateDTO) {
  const res = await axios.post<GeneralResponse<Handover>>(`/handover`, data);

  return res.data;
}

type UseCreateHandoverOptions = {
  config?: MutationConfig<typeof createHandover>;
};

export function useCreateHandover({ config }: UseCreateHandoverOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createHandover,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['handovers'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
