import { Button, NumberInput, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { EmployeeSelect } from '@/features/employee';
import { useOutletContext } from '@/features/outlet';

import { useCreateWage } from '../api';
import { WageDTO } from '../types';

const initialValues: WageDTO = {
  amount: 0,
  date: new Date(),
  type: null,
  notes: '',
  employee: null,
};

export const WageCreate: React.FC = () => {
  const navigate = useNavigate();
  const { outlet } = useOutletContext();
  const createMutation = useCreateWage();
  const form = useForm<WageDTO>({
    initialValues: {
      ...initialValues,
      company: outlet?.company.id,
      outlet: outlet?.id,
    },
  });

  const handleSubmit = form.onSubmit(async (data) => {
    await createMutation.mutateAsync(
      {
        data,
      },
      {
        onError: ({ response }) => {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess: () => {
          notifications.show({
            color: 'green',
            message: 'Kasbon berhasil dibuat',
          });
          form.setValues({
            ...initialValues,
            company: outlet?.company.id,
            outlet: outlet?.id,
          });
        },
      }
    );
  });

  return (
    <main className="pt-14">
      <Navbar title="Tambah Kasbon" />

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2.5 px-5 mt-2">
          <DateInput
            {...form.getInputProps('date')}
            label="Tanggal"
            placeholder="Masukan Tanggal"
            leftSection={<IconCalendar size={14} />}
            valueFormat="dddd, D MMMM YYYY"
          />
          <Select
            {...form.getInputProps('type')}
            label="Tipe"
            placeholder="Pilih Tipe"
            data={[
              { value: 'debit', label: 'Tunai' },
              { value: 'credit', label: 'Kredit' },
            ]}
          />
          <EmployeeSelect
            {...form.getInputProps('employee')}
            label="Pegawai"
            placeholder="Pilih Pegawai"
            leftSection={<IconUser size={14} />}
          />
          <NumberInput
            {...form.getInputProps('amount')}
            label="Jumlah"
            hideControls
            leftSection={<span className="text-xs">Rp. </span>}
            placeholder="Masukan Jumlah"
            thousandSeparator="."
            decimalSeparator=","
          />
          <Textarea
            {...form.getInputProps('notes')}
            label="Catatan"
            placeholder="Tambahkan Catatan"
          />
        </div>

        <footer className="px-5 space-y-2 max-w-md bottom-0 fixed bg-white py-4 w-full shadow-md shadow-gray-400">
          <Button fullWidth type="submit" loading={createMutation.isPending}>
            Simpan
          </Button>
          <Button
            type="button"
            variant="default"
            fullWidth
            onClick={() => navigate(-1)}
            loading={createMutation.isPending}
          >
            Batal
          </Button>
        </footer>
      </form>
    </main>
  );
};
