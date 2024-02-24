import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Purchase, PurchaseDTO } from '../../types';

type PurchaseCreateRequest = {
  data: PurchaseDTO;
};

export async function createPurchase({ data }: PurchaseCreateRequest) {
  const res = await axios.post<GeneralResponse<Purchase>>(`/purchase`, data);

  return res.data;
}

type UseCreatePurchaseOptions = {
  config?: MutationConfig<typeof createPurchase>;
};

export function useCreatePurchase({ config }: UseCreatePurchaseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createPurchase,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['purchase'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
