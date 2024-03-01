import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover } from '../types';

type TurnoverDeleteRequest = {
  id: number;
};

export async function deleteTurnover({ id }: TurnoverDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Turnover>>(`/turnover/${id}`);

  return res.data;
}

type UseDeleteTurnoverOptions = {
  config?: MutationConfig<typeof deleteTurnover>;
};

export function useDeleteTurnover({ config }: UseDeleteTurnoverOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteTurnover,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['turnovers'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
