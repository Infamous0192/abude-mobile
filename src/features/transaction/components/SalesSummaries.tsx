import { Table } from '@mantine/core';
import { useId } from 'react';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { usePurchasesSummary, useSalesSummary } from '../api';
import { SaleSummary, SaleSummaryQuery } from '../types';

type Props = {
  hideTable?: boolean;
  withProduct?: boolean;
  hideProfit?: boolean;
} & SaleSummaryQuery;

export const SalesSummaries: React.FC<Props> = ({
  withProduct,
  hideTable,
  hideProfit,
  ...params
}) => {
  const sale = useSalesSummary({
    params,
  });
  const purchase = usePurchasesSummary({
    params,
    config: { enabled: !hideProfit },
  });
  const id = useId();

  const isLoading = sale.isLoading;
  const isError = purchase.isError || sale.isError;

  const totalSales = sale.data?.reduce(
    (acc, summary) => [acc[0] + summary.quantity, acc[1] + summary.total],
    [0, 0]
  );
  const totalPurchases = purchase.data?.reduce(
    (acc, summary) => [acc[0] + summary.quantity, acc[1] + summary.total],
    [0, 0]
  );

  function productSummary() {
    if (!withProduct || !sale.data) return null;

    return (sale.data ?? []).reduce(
      (acc, sale) => {
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
      },
      [] as Omit<SaleSummary, 'date'>[]
    );
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
        <Table.Thead>
          {!hideTable && (
            <Table.Tr>
              <Table.Th className="whitespace-nowrap">Tanggal</Table.Th>
              <Table.Th className="whitespace-nowrap">Barang</Table.Th>
              <Table.Th>Jumlah</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          )}
        </Table.Thead>
        <Table.Tbody>
          {isLoading && <LoadingState />}
          {isError && <ErrorState />}
          {!isLoading && !isError && (
            <>
              {!hideTable &&
                sale.data?.map(({ name, date, total, quantity }, i) => (
                  <Table.Tr key={`${id}_${i}`}>
                    <Table.Td>{dayjs(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</Table.Td>
                    <Table.Td>{name}</Table.Td>
                    <Table.Td>{quantity}</Table.Td>
                    <Table.Td className="text-right">{formatCurrency(total)}</Table.Td>
                  </Table.Tr>
                ))}
              {productSummary()?.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td colSpan={2} className="text-center">
                    {item.name}
                  </Table.Td>
                  <Table.Td className="">{item.quantity}</Table.Td>
                  <Table.Td className="text-right">{formatCurrency(item.total)}</Table.Td>
                </Table.Tr>
              ))}
              {totalSales && totalSales[0] ? (
                <>
                  <Table.Tr className="bg-gray-50">
                    <Table.Td colSpan={3} className="w-full">
                      <div className="font-bold text-center">Total Penjualan</div>
                    </Table.Td>
                    <Table.Td className="text-right">
                      <span className="font-bold text-right">{formatCurrency(totalSales[1])}</span>
                    </Table.Td>
                  </Table.Tr>

                  {!!totalPurchases && (
                    <>
                      <Table.Tr className="bg-gray-50">
                        <Table.Td colSpan={3} className="w-full">
                          <div className="font-bold text-center">Total Pembelian</div>
                        </Table.Td>
                        <Table.Td className="text-right">
                          <span className="font-bold text-right">
                            {formatCurrency(totalPurchases[1])}
                          </span>
                        </Table.Td>
                      </Table.Tr>
                      <Table.Tr className="bg-gray-50">
                        <Table.Td colSpan={3} className="w-full">
                          <div className="font-bold text-center">Laba Kotor</div>
                        </Table.Td>
                        <Table.Td className="text-right whitespace-nowrap">
                          <span className="font-bold text-right">
                            {formatCurrency(totalSales[1] - totalPurchases[1])}
                          </span>
                        </Table.Td>
                      </Table.Tr>
                    </>
                  )}
                </>
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={4} className="text-center">
                    <div className="py-4">Data tidak ditemukan</div>
                  </Table.Td>
                </Table.Tr>
              )}
            </>
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
};
