import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Expense } from '../../types';

type ExpenseCancelRequest = {
  id: number;
};

export async function cancelExpense({ id }: ExpenseCancelRequest) {
  const res = await axios.patch<GeneralResponse<Expense>>(`/expense/${id}/cancel`);

  return res.data;
}

type UseCancelExpenseOptions = {
  config?: MutationConfig<typeof cancelExpense>;
};

export function useCancelExpense({ config }: UseCancelExpenseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: cancelExpense,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
