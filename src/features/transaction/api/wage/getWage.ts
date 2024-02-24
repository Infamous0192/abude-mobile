import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Wage } from '../../types';

type WageRequest = {
  id: number;
};

export async function getWage({ id }: WageRequest) {
  const res = await axios.get<Wage>(`/wage/${id}`);

  return res.data;
}

type QueryFnType = typeof getWage;

type UseWageOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useWage({ config, id }: UseWageOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['wage', id],
    queryFn: () => getWage({ id }),
  });
}
