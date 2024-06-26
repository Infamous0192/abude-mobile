import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Product } from '../types';

type ProductDeleteRequest = {
  id: number;
};

export async function deleteProduct({ id }: ProductDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Product>>(`/product/${id}`);

  return res.data;
}

type UseDeleteProductOptions = {
  config?: MutationConfig<typeof deleteProduct>;
};

export function useDeleteProduct({ config }: UseDeleteProductOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteProduct,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
