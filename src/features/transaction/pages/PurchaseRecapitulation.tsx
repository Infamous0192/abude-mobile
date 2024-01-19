import { Select, Table } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconAdjustments, IconCalendar, IconCategory } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { Navbar } from '@/components/navigation';
import { Authorization } from '@/features/auth';
import { OutletSelect, useOutletContext } from '@/features/outlet';
import { formatCurrency } from '@/utils/format';

import { usePurchasesSummary } from '../api';
import { PurchasesSummary, PurchasesSummaryQuery, TransactionStatus } from '../types';

export const PurchaseRecapitulation: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<PurchasesSummaryQuery>({
    outlet: outlet?.id,
    status: ['accepted'],
    startDate: new Date(),
    endDate: new Date(),
  });

  const { data, isLoading, isError } = usePurchasesSummary({ params });

  const result = useMemo(() => {
    if (!data) return [];

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
    }, [] as Omit<PurchasesSummary, 'date'>[]);
  }, [data]);

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

  console.log(result);

  return (
    <main className="bg-gray-50">
      <Navbar title="Rekapitulasi Pembelian" withBorder to="/" />

      <section className="px-5 space-y-2">
        <Authorization role={['owner', 'superadmin']}>
          <OutletSelect
            placeholder="Pilih Outlet"
            icon={<IconCategory size={14} />}
            value={params.outlet?.toString()}
            onChange={(v) => {
              if (v == null) return;

              setParams({
                ...params,
                outlet: v,
              });
            }}
          />
        </Authorization>
        <DatePickerInput
          type="range"
          valueFormat="D MMMM YYYY"
          placeholder="Rentang Tanggal"
          icon={<IconCalendar size={14} />}
          value={[params.startDate ?? null, params.endDate ?? null]}
          allowSingleDateInRange
          onChange={([startDate, endDate]) =>
            setParams({
              ...params,
              startDate: startDate ?? undefined,
              endDate: endDate ?? undefined,
            })
          }
        />
        <Select
          icon={<IconAdjustments size={14} />}
          data={[
            { value: 'accepted', label: 'Diterima' },
            { value: 'approved', label: 'Direkap' },
            { value: 'canceled', label: 'Batal' },
          ]}
          value={params.status ? params.status[0] : undefined}
          onChange={(v) => {
            if (v == null) return;

            setParams({ ...params, status: [v as TransactionStatus] });
          }}
        />
      </section>

      <section className="px-5 my-4">
        <div className="overflow-auto relative shadow-lg shadow-gray-200 bg-white rounded-md">
          <Table>
            <thead>
              <tr>
                <th>Barang</th>
                <th>Jumlah</th>
                <th>Harga Rata-rata</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <LoadingState />}
              {isError && <ErrorState />}
              {!isLoading && !isError && (
                <>
                  {result.map((item) => (
                    <tr key={item.id}>
                      <td className="text-left">{item.name}</td>
                      <td className="text-left">{item.quantity}</td>
                      <td className="text-right">{formatCurrency(item.total / item.quantity)}</td>
                      <td className="text-right">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="w-full">
                      <div className="font-bold text-center">Total Pembelian</div>
                    </td>
                    <td className="text-right">
                      <span className="font-bold text-right">
                        {formatCurrency(
                          result.reduce((prev, curr) => {
                            return prev + curr.total;
                          }, 0)
                        )}
                      </span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>
        </div>
      </section>
    </main>
  );
};
