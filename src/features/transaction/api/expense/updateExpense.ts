import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Expense, ExpenseDTO } from '../../types';

export type ExpenseUpdateRequest = {
  id: number;
  data: ExpenseDTO;
};

export async function updateExpense({ id, data }: ExpenseUpdateRequest) {
  const res = await axios.put<GeneralResponse<Expense>>(`/expense/${id}`, data);

  return res.data;
}

type UseUpdateExpenseOptions = {
  config?: MutationConfig<typeof updateExpense>;
};

export function useUpdateExpense({ config }: UseUpdateExpenseOptions = {}) {
  return useMutation({
    mutationFn: updateExpense,
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
