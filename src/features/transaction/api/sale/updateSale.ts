import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Sale, SaleDTO } from '../../types';

export type SaleUpdateRequest = {
  id: number;
  data: SaleDTO;
};

export async function updateSale({ id, data }: SaleUpdateRequest) {
  const res = await axios.put<GeneralResponse<Sale>>(`/sale/${id}`, data);

  return res.data;
}

type UseUpdateSaleOptions = {
  config?: MutationConfig<typeof updateSale>;
};

export function useUpdateSale({ config }: UseUpdateSaleOptions = {}) {
  return useMutation({
    mutationFn: updateSale,
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sale'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
