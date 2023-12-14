import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Turnover } from '../types';

type TurnoverDeleteDTO = {
  id: number;
};

export async function deleteTurnover({ id }: TurnoverDeleteDTO) {
  const res = await axios.delete<GeneralResponse<Turnover>>(`/turnover/${id}`);

  return res.data;
}

type UseDeleteTurnoverOptions = {
  config?: MutationConfig<typeof deleteTurnover>;
};

export function useDeleteTurnover({ config }: UseDeleteTurnoverOptions = {}) {
  return useMutation(deleteTurnover, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['turnovers']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
