import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover, TurnoverRequest } from '../types';

type TurnoverCreateDTO = {
  data: TurnoverRequest;
};

export async function createTurnover({ data }: TurnoverCreateDTO) {
  const res = await axios.post<GeneralResponse<Turnover>>(`/turnover`, data);

  return res.data;
}

type UseCreateTurnoverOptions = {
  config?: MutationConfig<typeof createTurnover>;
};

export function useCreateTurnover({ config }: UseCreateTurnoverOptions = {}) {
  return useMutation(createTurnover, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['turnovers']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
