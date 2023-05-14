import { Table } from '@mantine/core';
import { useId } from 'react';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useSalesSummary } from '../api';
import { SalesSummaryQuery } from '../types';

type Props = SalesSummaryQuery;

export const SalesSummary: React.FC<Props> = (params) => {
  const { data, isLoading, isError } = useSalesSummary({ params });
  const totalSales = data?.reduce((acc, summary) => acc + summary.total, 0);
  const id = useId();

  const ErrorState = () => (
    <tr>
      <td colSpan={4} className="text-center text-red-600">
        <div className="py-4">Terjadi Kesalahan</div>
      </td>
    </tr>
  );

  const LoadingState = () => (
    <>
      <tr>
        <td colSpan={4}>
          <div className="bg-gray-200 w-full h-4 rounded-sm animate-pulse"></div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <div className="bg-gray-200 w-full h-4 rounded-sm animate-pulse"></div>
        </td>
      </tr>
      <tr>
        <td colSpan={4}>
          <div className="bg-gray-200 w-full h-4 rounded-sm animate-pulse"></div>
        </td>
      </tr>
    </>
  );

  return (
    <div className="overflow-auto relative bg-white rounded-md">
      <Table>
        <thead>
          <tr>
            <th className="whitespace-nowrap">Tanggal</th>
            <th>Barang</th>
            <th>Jumlah</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {!isLoading && !isError && (
            <>
              {data.map(({ name, date, total, quantity }, i) => (
                <tr key={`${id}_${i}`}>
                  <td>{dayjs(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</td>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{formatCurrency(total)}</td>
                </tr>
              ))}
              {totalSales ? (
                <tr>
                  <td colSpan={3} className="w-full">
                    <div className="font-bold text-center">Jumlah</div>
                  </td>
                  <td>
                    <span className="font-bold">
                      {formatCurrency(data.reduce((acc, summary) => acc + summary.total, 0))}
                    </span>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    <div className="py-4">Data tidak ditemukan</div>
                  </td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};
