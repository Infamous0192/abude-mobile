import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Sale } from '../../types';

type SaleCancelRequest = {
  id: number;
};

export async function cancelSale({ id }: SaleCancelRequest) {
  const res = await axios.patch<GeneralResponse<Sale>>(`/sale/${id}/cancel`);

  return res.data;
}

type UseCancelSaleOptions = {
  config?: MutationConfig<typeof cancelSale>;
};

export function useCancelSale({ config }: UseCancelSaleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: cancelSale,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sale'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
