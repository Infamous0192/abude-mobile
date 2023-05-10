import { Button, Loader } from '@mantine/core';
import { IconArrowBarToDown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useInfinitePurchases } from '../api';
import { Purchase, PurchaseQuery } from '../types';

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

export const PurchaseList: React.FC<Props> = () => {
  const { outlet } = useOutletContext();
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfinitePurchases({
    params: { outlet: outlet?.id },
  });

  const purchases = data?.pages.reduce(
    (prev, { result }) => [...prev, ...result],
    [] as Purchase[]
  );

  return (
    <>
      {purchases?.length == 0 && <div className="px-5">Belum ada pembelian</div>}
      {purchases?.map((purchase) => (
        <PurchaseItem key={purchase.id} {...purchase} />
      ))}
      <div className="px-5 flex items-center justify-center py-4">
        {isFetching ? (
          <Loader />
        ) : (
          hasNextPage && (
            <Button variant="subtle" fullWidth onClick={() => fetchNextPage()}>
              Lihat Semua
            </Button>
          )
        )}
      </div>
    </>
  );
};
