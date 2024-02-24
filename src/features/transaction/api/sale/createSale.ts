import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Sale, SaleDTO } from '../../types';

type SaleCreateRequest = {
  data: SaleDTO;
};

export async function createSale({ data }: SaleCreateRequest) {
  const res = await axios.post<GeneralResponse<Sale>>(`/sale`, data);

  return res.data;
}

type UseCreateSaleOptions = {
  config?: MutationConfig<typeof createSale>;
};

export function useCreateSale({ config }: UseCreateSaleOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createSale,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      queryClient.invalidateQueries({ queryKey: ['sale'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
