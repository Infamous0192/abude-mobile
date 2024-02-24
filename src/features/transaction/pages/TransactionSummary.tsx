import { Button, Select, Tabs } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconAdjustments, IconCalendar, IconCategory, IconPrinter } from '@tabler/icons-react';
import { useState } from 'react';

import { Navbar } from '@/components/navigation';
import { Authorization } from '@/features/auth';
import { OutletSelect, useOutletContext } from '@/features/outlet';
import { baseURL } from '@/lib/axios';
import { dayjs } from '@/lib/dayjs';
import storage from '@/utils/storage';

import { PurchasesSummaries, SalesSummaries } from '../components';
import { PurchaseSummaryQuery, SaleSummaryQuery, TransactionStatus } from '../types';

const SalesSection: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<SaleSummaryQuery>({
    outlet: outlet?.id,
    status: ['accepted'],
    startDate: new Date(),
    endDate: new Date(),
  });

  const startDate = dayjs(params.startDate).startOf('d').toDate().toJSON();
  const endDate = dayjs(params.endDate).endOf('d').toDate().toJSON();

  return (
    <section>
      <div className="space-y-2 mb-4 mt-2">
        <Authorization role={['owner', 'superadmin']}>
          <OutletSelect
            placeholder="Pilih Outlet"
            leftSection={<IconCategory size={14} />}
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
          leftSection={<IconCalendar size={14} />}
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
          leftSection={<IconAdjustments size={14} />}
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

        <div className="flex items-center justify-end space-x-2">
          <Button
            component="a"
            href={`${baseURL}/outlet/${
              params.outlet
            }/transaction/print?startDate=${startDate}&endDate=${endDate}&token=${storage.getToken()}`}
            target="_blank"
            leftSection={<IconPrinter size={16} />}
            size="xs"
          >
            Cetak per Outlet
          </Button>

          <Authorization role={['superadmin', 'owner']}>
            <Button
              component="a"
              href={`${baseURL}/company/${
                outlet?.company.id
              }/transaction/print?startDate=${startDate}&endDate=${endDate}&token=${storage.getToken()}`}
              target="_blank"
              leftSection={<IconPrinter size={16} />}
              size="xs"
            >
              Cetak Semua
            </Button>
          </Authorization>
        </div>
      </div>

      <div className="mt-4">
        <SalesSummaries {...params} />
      </div>
    </section>
  );
};

const PurchasesSection: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<PurchaseSummaryQuery>({
    outlet: outlet?.id,
    status: ['accepted'],
    startDate: new Date(),
    endDate: new Date(),
  });

  const startDate = dayjs(params.startDate).startOf('d').toDate().toJSON();
  const endDate = dayjs(params.endDate).endOf('d').toDate().toJSON();

  return (
    <section>
      <div className="space-y-2 mb-4 mt-2">
        <Authorization role={['owner', 'superadmin']}>
          <OutletSelect
            placeholder="Pilih Outlet"
            leftSection={<IconCategory size={14} />}
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
          leftSection={<IconCalendar size={14} />}
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
          leftSection={<IconAdjustments size={14} />}
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
        <div className="flex items-center justify-end space-x-2">
          <Button
            component="a"
            href={`${baseURL}/outlet/${
              params.outlet
            }/transaction/print?startDate=${startDate}&endDate=${endDate}&token=${storage.getToken()}`}
            target="_blank"
            leftSection={<IconPrinter size={16} />}
            size="xs"
          >
            Cetak per Outlet
          </Button>
          <Authorization role={['superadmin', 'owner']}>
            <Button
              component="a"
              href={`${baseURL}/company/${
                outlet?.company.id
              }/transaction/print?startDate=${startDate}&endDate=${endDate}&token=${storage.getToken()}`}
              target="_blank"
              leftSection={<IconPrinter size={16} />}
              size="xs"
            >
              Cetak Semua
            </Button>
          </Authorization>
        </div>
      </div>

      <div className="mt-4">
        <PurchasesSummaries {...params} />
      </div>
    </section>
  );
};

export const TransactionSummary: React.FC = () => {
  const [selected, setSelected] = useState('sale');

  return (
    <main>
      <Navbar title="Statistik Harian" withBorder to="/" />

      <div className="px-5">
        <Tabs
          variant="pills"
          unstyled
          radius="xl"
          value={selected}
          onChange={(v) => setSelected(v ?? '')}
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
