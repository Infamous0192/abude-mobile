import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Recapitulation, RecapitulationDTO } from '../types';

type RecapitulationCreateRequest = {
  data: RecapitulationDTO;
};

export async function createRecap({ data }: RecapitulationCreateRequest) {
  const res = await axios.post<GeneralResponse<Recapitulation>>(`/inventory/recapitulation`, data);

  return res.data;
}

type UseCreateRecapOptions = {
  config?: MutationConfig<typeof createRecap>;
};

export function useCreateRecap({ config }: UseCreateRecapOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createRecap,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['recapitulations'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
