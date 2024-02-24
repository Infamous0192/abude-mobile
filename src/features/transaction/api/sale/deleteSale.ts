import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Sale } from '../../types';

type SaleDeleteRequest = {
  id: number;
};

export async function deleteSale({ id }: SaleDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Sale>>(`/sale/${id}`);

  return res.data;
}

type UseDeleteSaleOptions = {
  config?: MutationConfig<typeof deleteSale>;
};

export function useDeleteSale({ config }: UseDeleteSaleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteSale,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sale'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
