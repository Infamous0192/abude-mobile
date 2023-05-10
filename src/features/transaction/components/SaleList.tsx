import { Button, Loader } from '@mantine/core';
import { IconArrowBarUp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useInfiniteSales } from '../api';
import { Sale, SaleQuery } from '../types';

const SaleItem: React.FC<Sale> = (sale) => {
  return (
    <Link
      to={`/sales/${sale.id}`}
      className="w-full flex items-center active:bg-gray-100 px-5 py-2 transition cursor-pointer"
    >
      <div className="flex-shrink-0">
        <div className="rounded-lg p-2 bg-blue-100 text-blue-600">
          <IconArrowBarUp className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-grow px-3 flex flex-col justify-between">
        <div className="font-bold capitalize">Penjualan</div>
        <div className="text-xs font-semibold text-gray-600">
          {dayjs(sale.createdAt).format('D MMM YYYY HH:mm')}
        </div>
      </div>
      <div className="flex-grow text-right">
        <div className="font-bold">{formatCurrency(sale.total)}</div>
      </div>
    </Link>
  );
};

type Props = {
  query?: SaleQuery;
};

export const SaleList: React.FC<Props> = () => {
  const { outlet } = useOutletContext();
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteSales({
    params: { outlet: outlet?.id },
  });

  const sales = data?.pages.reduce((prev, { result }) => [...prev, ...result], [] as Sale[]);

  return (
    <>
      {sales?.length == 0 && <div className="px-5">Belum ada penjualan</div>}
      {sales?.map((sale) => (
        <SaleItem key={sale.id} {...sale} />
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
