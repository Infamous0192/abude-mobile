import { Button, Loader } from '@mantine/core';

import { formatCurrency } from '@/utils/format';

import { useInfiniteStocks } from '../api';
import { Stock, StockQuery } from '../types';

type Props = StockQuery;

export const StockList: React.FC<Props> = ({ ...props }) => {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteStocks({
    params: {
      limit: 10,
      ...props,
    },
  });

  const stocks =
    data?.pages.reduce((prev, { result }) => [...prev, ...result], [] as Stock[]) ?? [];

  return (
    <div className="space-y-2.5">
      {stocks.map((stock, i) => (
        <div key={i} className="rounded-lg bg-white shadow-lg p-4">
          <div className="flex pb-1.5 mb-1.5 border-b border-gray-200">
            <div className="flex-grow">
              <div className="text-xs text-blue-600">{stock.category.name}</div>
              <div className="text-base text-gra-900 font-bold">{stock.product.name}</div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-xs text-gray-600">Harga Rerata</div>
              <div className="text-sm font-bold">{formatCurrency(stock.averagePrice)}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <div className="text-xs text-gray-600">Total Persediaan</div>
              <div className="text-sm font-bold">
                {Number(stock.amount).toLocaleString('id-ID')}{' '}
                <span className="text-xs">{stock.product.unit}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total Aset</div>
              <div className="text-sm font-bold">{formatCurrency(stock.totalValue)}</div>
            </div>
          </div>
        </div>
      ))}

      <div className="px-5">
        {isFetching ? (
          <div className="flex items-center justify-center py-1">
            <Loader type="dots" />
          </div>
        ) : (
          hasNextPage && (
            <Button variant="subtle" fullWidth onClick={() => fetchNextPage()}>
              Lihat Semua
            </Button>
          )
        )}
      </div>
    </div>
  );
};
