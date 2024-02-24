import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Wage, WageDTO } from '../../types';

export type WageUpdateRequest = {
  id: number;
  data: WageDTO;
};

export async function updateWage({ id, data }: WageUpdateRequest) {
  const res = await axios.put<GeneralResponse<Wage>>(`/wage/${id}`, data);

  return res.data;
}

type UseUpdateWageOptions = {
  config?: MutationConfig<typeof updateWage>;
};

export function useUpdateWage({ config }: UseUpdateWageOptions = {}) {
  return useMutation({
    mutationFn: updateWage,
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['wages'] });
      queryClient.invalidateQueries({ queryKey: ['wage'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
