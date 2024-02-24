import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Wage, WageDTO } from '../../types';

type WageCreateRequest = {
  data: WageDTO;
};

export async function createWage({ data }: WageCreateRequest) {
  const res = await axios.post<GeneralResponse<Wage>>(`/wage`, data);

  return res.data;
}

type UseCreateWageOptions = {
  config?: MutationConfig<typeof createWage>;
};

export function useCreateWage({ config }: UseCreateWageOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createWage,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['wages'] });
      queryClient.invalidateQueries({ queryKey: ['wage'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
