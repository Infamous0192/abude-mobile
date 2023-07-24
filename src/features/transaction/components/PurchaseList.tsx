import { Button, Loader } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowBarToDown, IconCalendar, IconDots } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useInfinitePurchases } from '../api';
import { Purchase, PurchaseQuery } from '../types';

import { PurchaseStatus } from './PurchaseStatus';

const PurchaseItem: React.FC<Purchase> = (purchase) => {
  return (
    <Link
      to={`/purchases/${purchase.id}`}
      className="w-full block active:bg-gray-100 px-5 py-2 transition cursor-pointer"
    >
      <div className="flex w-full">
        <div className="flex-shrink-0">
          <div className="rounded-lg p-2 bg-orange-100 text-orange-600">
            <IconArrowBarToDown className="w-6 h-6" />
          </div>
        </div>
        <div className="flex-grow px-3">
          <div className="font-bold text-sm capitalize">{purchase.code}</div>
          <PurchaseStatus status={purchase.status} />
        </div>
        <div className="flex-grow text-right">
          <div className="font-bold">{formatCurrency(purchase.total)}</div>
          <div className="text-xs font-semibold text-gray-600">
            {dayjs(purchase.date).format('D MMM YYYY HH:mm')}
          </div>
        </div>
      </div>
      {purchase.items.length > 0 && (
        <div className="text-xs text-gray-600 flex flex-col items-end">
          <ul className="m-0">
            <li>
              {purchase.items[0].quantity} {purchase.items[0].product.unit}{' '}
              {purchase.items[0].product.name}
            </li>
          </ul>
          {purchase.items.length > 1 && <IconDots stroke={0.9} size={14} />}
        </div>
      )}
    </Link>
  );
};

type Props = {
  query?: PurchaseQuery;
};

export const PurchaseList: React.FC<Props> = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<PurchaseQuery>({});
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfinitePurchases({
    params: { ...params, outlet: outlet?.id },
    config: {
      enabled: (!params.startDate && !params.endDate) || (!!params.startDate && !!params.endDate),
    },
  });

  const purchases = data?.pages.reduce(
    (prev, { result }) => [...prev, ...result],
    [] as Purchase[]
  );

  return (
    <>
      <div className="px-5 mb-2">
        <DatePickerInput
          icon={<IconCalendar size={14} />}
          placeholder="Rentang Tanggal"
          type="range"
          clearable
          allowSingleDateInRange
          valueFormat="D MMMM YYYY"
          value={[params.startDate ?? null, params.endDate ?? null]}
          onChange={(v) => {
            setParams({
              ...params,
              startDate: v[0] != null ? dayjs(v[0]).startOf('day').toDate() : undefined,
              endDate: v[1] != null ? dayjs(v[1]).endOf('day').toDate() : undefined,
            });
          }}
        />
      </div>
      {purchases?.length == 0 && <div className="px-5">Belum ada pembelian</div>}
      <div className="divide-y divide-gray-200">
        {purchases?.map((purchase) => (
          <PurchaseItem key={purchase.id} {...purchase} />
        ))}
      </div>
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
