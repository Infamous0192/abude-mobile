import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Sale } from '../../types';

type SaleRequest = {
  id: number;
};

export async function getSale({ id }: SaleRequest) {
  const res = await axios.get<Sale>(`/sale/${id}`);

  return res.data;
}

type QueryFnType = typeof getSale;

type UseSaleOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useSale({ config, id }: UseSaleOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['sale', id],
    queryFn: () => getSale({ id }),
  });
}
