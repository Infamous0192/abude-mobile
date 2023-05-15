import { Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

import { Navbar } from '@/components/navigation';
import { ShiftSelect } from '@/features/employee';
import { useOutletContext } from '@/features/outlet';

import { HandoverList, HandoverListProps } from '../components';

export const Handovers: React.FC = () => {
  const { outlet } = useOutletContext();
  const [params, setParams] = useState<HandoverListProps>({ outlet: outlet?.id });

  function handleClear() {
    setParams({ outlet: outlet?.id });
  }

  return (
    <main>
      <Navbar withBorder to="/" />

      <section className="px-5">
        <div className="space-y-2">
          <ShiftSelect
            label="Shift"
            placeholder="Pilih Shift"
            company={outlet?.company.id}
            value={params.shift?.toString() ?? ''}
            onChange={(v) => setParams({ ...params, shift: parseInt(v || '') })}
          />

          <DatePickerInput
            type="range"
            valueFormat="D MMMM YYYY"
            label="Rentang Tanggal"
            placeholder="Pilih Tanggal"
            value={[params.startDate || null, params.endDate || null]}
            onChange={([startDate, endDate]) =>
              setParams({
                ...params,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
              })
            }
          />
        </div>

        <div className="flex items-center justify-end space-x-2 mt-4">
          <Button size="xs" variant="default" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </section>

      <section className="mt-6">
        <div className="px-5 mb-2">
          <h2 className="font-bold">Rekap Serah Terima</h2>
        </div>
        <HandoverList {...params} />
      </section>
    </main>
  );
};
