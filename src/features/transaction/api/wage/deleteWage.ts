import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Wage } from '../../types';

type WageDeleteRequest = {
  id: number;
};

export async function deleteWage({ id }: WageDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Wage>>(`/wage/${id}`);

  return res.data;
}

type UseDeleteWageOptions = {
  config?: MutationConfig<typeof deleteWage>;
};

export function useDeleteWage({ config }: UseDeleteWageOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteWage,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['wages'] });
      queryClient.invalidateQueries({ queryKey: ['wage'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
