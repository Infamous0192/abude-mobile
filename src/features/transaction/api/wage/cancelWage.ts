import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Wage } from '../../types';

type WageCancelRequest = {
  id: number;
};

export async function cancelWage({ id }: WageCancelRequest) {
  const res = await axios.patch<GeneralResponse<Wage>>(`/wage/${id}/cancel`);

  return res.data;
}

type UseCancelWageOptions = {
  config?: MutationConfig<typeof cancelWage>;
};

export function useCancelWage({ config }: UseCancelWageOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: cancelWage,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['wages'] });
      queryClient.invalidateQueries({ queryKey: ['wage'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
