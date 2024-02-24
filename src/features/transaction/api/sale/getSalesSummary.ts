import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { dayjs } from '@/lib/dayjs';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { SaleSummary, SaleSummaryQuery } from '../../types';

type SummariesRequest = {
  params?: SaleSummaryQuery;
};

export async function getSalesSummary({ params }: SummariesRequest) {
  const res = await axios.get<SaleSummary[]>(`/sale/summary`, {
    params: {
      ...params,
      startDate: params?.startDate ? dayjs(params?.startDate).startOf('d').utc(true).toDate() : '',
      endDate: params?.endDate ? dayjs(params?.endDate).endOf('d').utc(true).toDate() : '',
    },
  });

  return res.data;
}

type QueryFnType = typeof getSalesSummary;

type UseSalesSummaryOptions = {
  params?: SaleSummaryQuery;
  config?: QueryConfig<QueryFnType>;
};

export function useSalesSummary({ config, params }: UseSalesSummaryOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['sales-summary', params],
    queryFn: () => getSalesSummary({ params }),
  });
}
