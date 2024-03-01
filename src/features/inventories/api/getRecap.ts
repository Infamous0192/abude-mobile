import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Recapitulation } from '../types';

export async function getRecap(id: number | string) {
  const res = await axios.get<Recapitulation>(`/inventory/recapitulation/${id}`);

  return res.data;
}

type QueryFnType = typeof getRecap;

type UseRecapOptions = {
  id: number | string;
  config?: QueryConfig<QueryFnType>;
};

export function useRecap({ id, config }: UseRecapOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['recapitulation', id],
    queryFn: () => getRecap(id),
    placeholderData: keepPreviousData,
  });
}
