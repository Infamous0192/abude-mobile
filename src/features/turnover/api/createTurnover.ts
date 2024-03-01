import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover, TurnoverDTO } from '../types';

type TurnoverCreateRequest = {
  data: TurnoverDTO;
};

export async function createTurnover({ data }: TurnoverCreateRequest) {
  const res = await axios.post<GeneralResponse<Turnover>>(`/turnover`, data);

  return res.data;
}

type UseCreateTurnoverOptions = {
  config?: MutationConfig<typeof createTurnover>;
};

export function useCreateTurnover({ config }: UseCreateTurnoverOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createTurnover,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['turnovers'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
