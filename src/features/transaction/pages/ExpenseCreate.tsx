import { Button, NumberInput, Select, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCategory } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { AccountSelect } from '@/features/account';
import { useOutletContext } from '@/features/outlet';

import { useCreateExpense } from '../api';
import { ExpenseDTO } from '../types';

const initialValues: ExpenseDTO = {
  amount: 0,
  date: new Date(),
  type: null,
  notes: '',
  account: null,
};

export const ExpenseCreate: React.FC = () => {
  const navigate = useNavigate();
  const { outlet } = useOutletContext();
  const createMutation = useCreateExpense();
  const form = useForm<ExpenseDTO>({
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
            message: 'Pengeluaran berhasil dibuat',
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
      <Navbar title="Tambah Pengeluaran" />

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2.5 px-5 mt-2">
          <DateInput
            {...form.getInputProps('date')}
            label="Tanggal"
            placeholder="Masukan Tanggal"
            leftSection={<IconCalendar size={20} />}
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
          <AccountSelect
            {...form.getInputProps('account')}
            label="Jenis"
            placeholder="Pilih Jenis"
            leftSection={<IconCategory size={20} />}
            params={{
              category: 4,
              company: outlet?.company.id,
            }}
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
