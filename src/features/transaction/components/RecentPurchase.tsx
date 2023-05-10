import { IconArrowBarToDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { usePurchases } from '../api';
import { Purchase, PurchaseQuery } from '../types';

const PurchaseSkeleton: React.FC = () => {
  return (
    <div className="w-full flex items-center px-5 py-2">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex-grow px-3 flex flex-col justify-between">
        <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2 rounded"></div>
        <div className="h-3 w-36 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );
};

const PurchaseItem: React.FC<Purchase> = (purchase) => {
  return (
    <Link
      to={`/purchases/${purchase.id}`}
      className="w-full flex items-center active:bg-gray-100 px-5 py-2 transition cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div className="rounded-lg p-2 bg-orange-100 text-orange-600">
          <IconArrowBarToDown className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-grow px-3 flex flex-col justify-between">
        <div className="font-bold capitalize">Pembelian</div>
        <div className="text-xs font-semibold text-gray-600">
          {dayjs(purchase.createdAt).format('D MMM YYYY HH:mm')}
        </div>
      </div>
      <div className="flex-grow text-right">
        <div className="font-bold">{formatCurrency(purchase.total)}</div>
      </div>
    </Link>
  );
};

type Props = {
  query?: PurchaseQuery;
};

export const RecentPurchase: React.FC<Props> = () => {
  const { outlet } = useOutletContext();
  const { data, isLoading, isError } = usePurchases({ params: { outlet: outlet?.id } });

  if (isLoading || isError)
    return (
      <>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <PurchaseSkeleton key={`ssk_${i}`} />
          ))}
      </>
    );

  return (
    <>
      {data.result.map((purchase) => (
        <PurchaseItem key={purchase.id} {...purchase} />
      ))}
    </>
  );
};
