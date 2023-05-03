import { useQuery } from '@tanstack/react-query';

import { Outlet } from '@/features/outlet';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { ResultResponse } from '@/types/api';

type EmployeesDTO = {
  id: number;
};

export async function getEmployeeOutlets({ id }: EmployeesDTO) {
  const res = await axios.get<ResultResponse<Outlet>>(`/employee/${id}/outlet`);

  return res.data;
}

type QueryFnType = typeof getEmployeeOutlets;

type UseEmployeesOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useEmployeeOutlets({ config, id }: UseEmployeesOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employee-outlets', id],
    queryFn: () => getEmployeeOutlets({ id }),
    keepPreviousData: true,
  });
}
