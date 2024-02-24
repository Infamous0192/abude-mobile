import { Badge, Button, Loader } from '@mantine/core';
import { IconArrowBarUp } from '@tabler/icons-react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useInfiniteExpenses } from '../api';
import { Expense, ExpenseQuery } from '../types';

type ExpenseItemProps = {
  expense: Expense;
  onClick?: () => void;
};

const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onClick }) => {
  function handleClick() {
    if (onClick) onClick();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white w-full text-left px-4 py-2.5 flex items-center space-x-2.5 active:bg-gray-50 transition"
    >
      <div className="flex-shrink-0 w-10 h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
        <IconArrowBarUp size={24} />
      </div>
      <div className="flex mb-2 w-full">
        <div className="flex-grow">
          <div className="font-bold text-sm">{expense.account?.name || 'Pengeluaran'}</div>
          <div className="text-gray-600 text-xs leading-none line-clamp-1">{expense.notes}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="font-bold text-sm leading-none mb-1">
            {formatCurrency(expense.amount)}
          </div>
          {expense.type == 'debit' ? (
            <Badge variant="light" color="blue" size="xs">
              Tunai
            </Badge>
          ) : (
            <Badge variant="light" color="orange" size="xs">
              Kredit
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

type Props = ExpenseQuery;

export const ExpenseList: React.FC<Props> = ({ ...params }) => {
  const navigate = useNavigate();
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteExpenses({
    params: {
      ...params,
      startDate: params.startDate
        ? dayjs(params.startDate).utc(true).startOf('D').toDate()
        : undefined,
      endDate: params.endDate ? dayjs(params.endDate).utc(true).startOf('d').toDate() : undefined,
    },
  });

  const [expenses, total] = useMemo(() => {
    const groups: { [key: string]: Expense[] } = {};
    const total: { [key: string]: number } = {};

    if (!data) return [groups, total];

    data.pages
      .reduce((prev, { result }) => [...prev, ...result], [] as Expense[])
      .forEach((item) => {
        const dateString = dayjs(item.date).format('D MMMM YYYY').toString();

        if (!groups[dateString]) {
          groups[dateString] = [];
          total[dateString] = 0;
        }
        groups[dateString].push(item);
        total[dateString] += item.amount;
      });

    return [groups, total];
  }, [data]);

  return (
    <>
      {Object.keys(expenses).map((date) => (
        <div className="bg-white mb-1" key={date}>
          <div className="flex justify-between px-4 pb-1 pt-2.5">
            <div className="text-base text-primary-600 font-bold">{date}</div>
            <div className="text-base text-primary-600 font-bold">
              {formatCurrency(total[date])}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {expenses[date].map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onClick={() => navigate(`/expense/${expense.id}`)}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="px-5 flex items-center justify-center py-4">
        {!isFetching && Object.keys(expenses).length == 0 && <div>Data tidak ditemukan</div>}
        {isFetching ? (
          <Loader variant="dots" />
        ) : (
          hasNextPage && (
            <Button variant="subtle" fullWidth onClick={() => fetchNextPage()}>
              Selengkapnya
            </Button>
          )
        )}
      </div>
    </>
  );
};
