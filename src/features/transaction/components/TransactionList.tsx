import { IconArrowBarToDown, IconArrowBarUp } from '@tabler/icons';
import { Link } from 'react-router-dom';

import { dayjs } from '@/lib/dayjs';
import { clsx, formatCurrency } from '@/utils/format';

import { Transaction, TransactionQuery } from '../types';

const transactions: Transaction[] = [
  {
    id: 1,
    code: 'BJM-12',
    category: 'penjualan',
    customer: 'Umum',
    note: '',
    items: [],
    total: 50000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    code: 'BJM-13',
    category: 'pembelian',
    customer: 'Umum',
    note: '',
    items: [],
    total: 655000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    code: 'BJM-14',
    category: 'penjualan',
    customer: 'Umum',
    note: '',
    items: [],
    total: 75000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// const SkeletonItem: React.FC = () => {
//   return (
//     <div className="w-full flex items-center px-5 py-2">
//       <div className="flex-shrink-0 w-10 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
//       <div className="flex-grow px-3 flex flex-col justify-between">
//         <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2 rounded"></div>
//         <div className="h-3 w-36 bg-gray-200 animate-pulse rounded"></div>
//       </div>
//     </div>
//   );
// };

const TransactionItem: React.FC<Transaction> = (transaction) => {
  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="w-full flex items-center active:bg-gray-100 px-5 py-2 transition cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div
          className={clsx(
            'rounded-lg p-2',
            transaction.category == 'penjualan'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-orange-100 text-orange-600'
          )}
        >
          {transaction.category == 'penjualan' ? (
            <IconArrowBarUp className="w-6 h-6" />
          ) : (
            <IconArrowBarToDown className="w-6 h-6" />
          )}
        </div>
      </div>
      <div className="flex-grow px-3 flex flex-col justify-between">
        <div className="font-bold capitalize">{transaction.category}</div>
        <div className="text-xs font-semibold text-gray-600">
          {dayjs(transaction.createdAt).format('D MMM YYYY HH:mm')}
        </div>
      </div>
      <div className="flex-grow text-right">
        <div className="font-bold">{formatCurrency(transaction.total)}</div>
      </div>
    </Link>
  );
};

export type Props = {
  query?: TransactionQuery;
};

export const TransactionList: React.FC<Props> = () => {
  return (
    <>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} {...transaction} />
      ))}
    </>
  );
};
