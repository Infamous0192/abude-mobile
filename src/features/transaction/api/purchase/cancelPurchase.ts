import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Purchase } from '../../types';

type PurchaseCancelRequest = {
  id: number;
};

export async function cancelPurchase({ id }: PurchaseCancelRequest) {
  const res = await axios.patch<GeneralResponse<Purchase>>(`/purchase/${id}/cancel`);

  return res.data;
}

type UseCancelPurchaseOptions = {
  config?: MutationConfig<typeof cancelPurchase>;
};

export function useCancelPurchase({ config }: UseCancelPurchaseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: cancelPurchase,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['purchase'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
