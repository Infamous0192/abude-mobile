import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover, TurnoverRequest } from '../types';

export type UpdateTurnoverDTO = {
  id: number;
  data: TurnoverRequest;
};

export async function updateTurnover({ id, data }: UpdateTurnoverDTO) {
  const res = await axios.put<GeneralResponse<Turnover>>(`/turnover/${id}`, data);

  return res.data;
}

type UseUpdateTurnoverOptions = {
  config?: MutationConfig<typeof updateTurnover>;
};

export function useUpdateTurnover({ config }: UseUpdateTurnoverOptions = {}) {
  return useMutation(updateTurnover, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['turnovers']);
      queryClient.invalidateQueries(['turnover', args[1].id]);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
