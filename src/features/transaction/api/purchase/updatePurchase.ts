import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Purchase, PurchaseDTO } from '../../types';

export type UpdatePurchaseDTO = {
  id: number;
  data: PurchaseDTO;
};

export async function updatePurchase({ id, data }: UpdatePurchaseDTO) {
  const res = await axios.put<GeneralResponse<Purchase>>(`/purchase/${id}`, data);

  return res.data;
}

type UseUpdatePurchaseOptions = {
  config?: MutationConfig<typeof updatePurchase>;
};

export function useUpdatePurchase({ config }: UseUpdatePurchaseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updatePurchase,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['purchase'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
