import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { Expense, ExpenseDTO } from '../../types';

type ExpenseCreateRequest = {
  data: ExpenseDTO;
};

export async function createExpense({ data }: ExpenseCreateRequest) {
  const res = await axios.post<GeneralResponse<Expense>>(`/expense`, data);

  return res.data;
}

type UseCreateExpenseOptions = {
  config?: MutationConfig<typeof createExpense>;
};

export function useCreateExpense({ config }: UseCreateExpenseOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: createExpense,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
