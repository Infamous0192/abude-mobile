import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { dayjs } from '@/lib/dayjs';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { PurchaseSummary, PurchaseSummaryQuery } from '../../types';

type SummariesRequest = {
  params?: PurchaseSummaryQuery;
};

export async function getPurchasesSummary({ params }: SummariesRequest) {
  const res = await axios.get<PurchaseSummary[]>(`/purchase/summary`, {
    params: {
      ...params,
      startDate: params?.startDate ? dayjs(params?.startDate).startOf('d').utc(true).toDate() : '',
      endDate: params?.endDate ? dayjs(params?.endDate).endOf('d').utc(true).toDate() : '',
    },
  });

  return res.data;
}

type QueryFnType = typeof getPurchasesSummary;

type UsePurchasesSummaryOptions = {
  params?: PurchaseSummaryQuery;
  config?: QueryConfig<QueryFnType>;
};

export function usePurchasesSummary({ config, params }: UsePurchasesSummaryOptions = {}) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['purchases-summary', params],
    queryFn: () => getPurchasesSummary({ params }),
  });
}
