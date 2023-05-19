import { Table } from '@mantine/core';
import { useId } from 'react';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useSalesSummary } from '../api';
import { SalesSummary, SalesSummaryQuery } from '../types';

type Props = {
  withProduct?: boolean;
} & SalesSummaryQuery;

export const SalesSummaries: React.FC<Props> = ({ withProduct, ...params }) => {
  const { data, isLoading, isError } = useSalesSummary({ params });
  const total = data?.reduce(
    (acc, summary) => [acc[0] + summary.quantity, acc[1] + summary.total],
    [0, 0]
  );
  const id = useId();

  function productSummary() {
    if (!withProduct || !data) return null;

    return (data ?? []).reduce((acc, sale) => {
      const existingSummary = acc.find((s) => s.id === sale.id);
      if (existingSummary) {
        existingSummary.quantity += sale.quantity;
        existingSummary.total += sale.total;
      } else {
        acc.push({
          id: sale.id,
          name: sale.name,
          quantity: sale.quantity,
          total: sale.total,
        });
      }
      return acc;
    }, [] as Omit<SalesSummary, 'date'>[]);
  }

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
    <div className="overflow-auto relative shadow-lg shadow-gray-200 bg-white rounded-md">
      <Table>
        <thead>
          <tr>
            <th className="whitespace-nowrap">Tanggal</th>
            <th className="whitespace-nowrap">Barang</th>
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
              {productSummary()?.map((item) => (
                <tr key={item.id} className="bg-gray-50 font-bold">
                  <td colSpan={2} className=" text-center">
                    {item.name}
                  </td>
                  <td className="">{item.quantity}</td>
                  <td>
                    <span className="">{formatCurrency(item.total)}</span>
                  </td>
                </tr>
              ))}
              {total && total[0] ? (
                <tr>
                  <td colSpan={3} className="w-full">
                    <div className="font-bold text-center">Total</div>
                  </td>
                  <td>
                    <span className="font-bold">{formatCurrency(total[1])}</span>
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
