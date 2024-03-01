import { Button } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { Authorization } from '@/features/auth';
import { ShiftSelect } from '@/features/employee';
import { OutletSelect, useOutletContext } from '@/features/outlet';

import { HandoverList } from '../components';
import { HandoverQuery } from '../types';

export const Handovers: React.FC = () => {
  const { outlet } = useOutletContext();
  const form = useForm<HandoverQuery>({
    initialValues: {
      page: 10,
      outlet: outlet?.id,
      shift: undefined,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const [params] = useDebouncedValue(form.values, 300);

  return (
    <main className="py-16">
      <Navbar title="Laporan Serah Terima" to="/" />

      <section className="px-5">
        <div className="space-y-2">
          <Authorization role={['owner', 'superadmin']}>
            <OutletSelect
              {...form.getInputProps('outlet')}
              label="Outlet"
              placeholder="Pilih Outlet"
            />
          </Authorization>

          <ShiftSelect
            {...form.getInputProps('shift')}
            label="Shift"
            placeholder="Pilih Shift"
            params={{
              company: outlet?.company.id,
            }}
            clearable
          />

          <DatePickerInput
            type="range"
            valueFormat="D MMMM YYYY"
            label="Rentang Tanggal"
            placeholder="Pilih Tanggal"
            allowSingleDateInRange
            clearable
            value={[params.startDate || null, params.endDate || null]}
            onChange={([startDate, endDate]) =>
              form.setValues({
                ...form.values,
                startDate: startDate || undefined,
                endDate: endDate || undefined,
              })
            }
          />
        </div>
      </section>

      <section className="mt-6">
        <div className="px-5 mb-4 flex items-center justify-between">
          <h2 className="font-bold">Rekap Serah Terima</h2>
        </div>
        <HandoverList {...params} />
      </section>

      <footer className="max-w-md bottom-0 fixed bg-white py-4 w-full border-t border-gray-50 px-5">
        <div className="flex items-center justify-between">
          <Button
            fullWidth
            component={Link}
            to="/handover/create"
            leftSection={<IconPlus size={16} />}
          >
            Tambah Laporan
          </Button>
        </div>
      </footer>
    </main>
  );
};
