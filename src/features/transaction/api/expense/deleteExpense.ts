import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Expense } from '../../types';

type ExpenseDeleteRequest = {
  id: number;
};

export async function deleteExpense({ id }: ExpenseDeleteRequest) {
  const res = await axios.delete<GeneralResponse<Expense>>(`/expense/${id}`);

  return res.data;
}

type UseDeleteExpenseOptions = {
  config?: MutationConfig<typeof deleteExpense>;
};

export function useDeleteExpense({ config }: UseDeleteExpenseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteExpense,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
