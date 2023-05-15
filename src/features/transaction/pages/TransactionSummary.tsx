import { Button, Tabs } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

import { Navbar } from '@/components/navigation';
import { useOutletContext } from '@/features/outlet';

import { PurchasesSummaries, SalesSummaries } from '../components';
import { PurchasesSummaryQuery, SalesSummaryQuery } from '../types';

const SalesSection: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<SalesSummaryQuery>({
    outlet: outlet?.id,
  });

  return (
    <section>
      <DatePickerInput
        type="range"
        valueFormat="D MMMM YYYY"
        label="Rentang Tanggal"
        placeholder="Pilih Tanggal"
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

      <div className="mt-4">
        <SalesSummaries {...params} withProduct />
      </div>
    </section>
  );
};

const PurchasesSection: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<PurchasesSummaryQuery>({
    outlet: outlet?.id,
  });

  return (
    <section>
      <DatePickerInput
        type="range"
        valueFormat="D MMMM YYYY"
        label="Rentang Tanggal"
        placeholder="Pilih Tanggal"
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

      <div className="mt-4">
        <PurchasesSummaries {...params} withProduct />
      </div>
    </section>
  );
};

export const TransactionSummary: React.FC = () => {
  const [selected, setSelected] = useState('sale');

  return (
    <main>
      <Navbar title="Statistik Transaksi" withBorder to="/" />

      <div className="px-5">
        <Tabs
          variant="pills"
          unstyled
          radius="xl"
          value={selected}
          onTabChange={(v) => setSelected(v ?? '')}
        >
          <Tabs.List>
            <Button
              component={Tabs.Tab}
              value="sale"
              variant={selected == 'sale' ? 'filled' : 'light'}
              radius="lg"
              className="mr-2"
            >
              Penjualan
            </Button>
            <Button
              component={Tabs.Tab}
              value="purchase"
              variant={selected == 'purchase' ? 'filled' : 'light'}
              radius="lg"
              className="mr-2"
            >
              Pembelian
            </Button>
          </Tabs.List>

          <Tabs.Panel value="sale" pt="xs">
            <SalesSection />
          </Tabs.Panel>

          <Tabs.Panel value="purchase" pt="xs">
            <PurchasesSection />
          </Tabs.Panel>
        </Tabs>
      </div>
    </main>
  );
};
