import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover, TurnoverDTO } from '../types';

type TurnoverUpdateRequest = {
  id: number;
  data: TurnoverDTO;
};

export async function updateTurnover({ id, data }: TurnoverUpdateRequest) {
  const res = await axios.put<GeneralResponse<Turnover>>(`/turnover/${id}`, data);

  return res.data;
}

type UseUpdateTurnoverOptions = {
  config?: MutationConfig<typeof updateTurnover>;
};

export function useUpdateTurnover({ config }: UseUpdateTurnoverOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateTurnover,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['turnovers'] });
      queryClient.invalidateQueries({ queryKey: ['turnover'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
