import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Employee } from '../types';

export async function getEmployeeByCreds() {
  const res = await axios.get<Employee>(`/employee/me`);

  return res.data;
}

type QueryFnType = typeof getEmployeeByCreds;

type UseEmployeesOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useEmployeeByCreds({ config }: UseEmployeesOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employee', 'me'],
    queryFn: () => getEmployeeByCreds(),
    keepPreviousData: true,
  });
}
