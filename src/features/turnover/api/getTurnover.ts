import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Turnover } from '../types';

type TurnoverRequest = {
  id: number;
};

export async function getTurnover({ id }: TurnoverRequest) {
  const res = await axios.get<Turnover>(`/turnover/${id}`);

  return res.data;
}

type QueryFnType = typeof getTurnover;

type UseTurnoverOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useTurnover({ config, id }: UseTurnoverOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['turnover', id],
    queryFn: () => getTurnover({ id }),
  });
}
