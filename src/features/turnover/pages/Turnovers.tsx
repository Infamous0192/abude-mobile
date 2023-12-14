import { Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { IconCalendar, IconCategory, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { Navbar } from '@/components/navigation';
import { OutletSelect, useOutletContext } from '@/features/outlet';

import { TurnoverForm, TurnoverList } from '../components';
import { TurnoverQuery } from '../types';

export const Turnovers: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<TurnoverQuery>({
    outlet: outlet?.id,
    startDate: undefined,
    endDate: undefined,
  });

  function handleAdd() {
    if (!outlet) return;

    modals.open({
      title: 'Tambah Bukti',
      children: <TurnoverForm outlet={outlet.id} />,
      fullScreen: true,
    });
  }

  return (
    <main>
      <Navbar title="Bukti Serah Terima" withBorder to="/" />

      <section className="space-y-2 mb-4 mt-2 px-5">
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
      </section>

      <section className="px-5">
        <TurnoverList outlet={outlet?.id} {...params} />
      </section>

      <footer className="max-w-md w-full fixed bottom-0 left-0 bg-white p-4 shadow-lg shadow-gray-200 border-t border-gray-100">
        <Button onClick={handleAdd} leftIcon={<IconPlus size={16} />} fullWidth size="xs">
          Tambah
        </Button>
      </footer>
    </main>
  );
};
