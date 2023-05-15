import { Button, NumberInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { ShiftSelect } from '@/features/employee';
import { useOutletContext } from '@/features/outlet';
import { SalesSummaries } from '@/features/transaction';

import { useCreateHandover } from '../api';
import { HandoverRequest } from '../types';

export const HandoverCreate: React.FC = () => {
  const { outlet } = useOutletContext();
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useCreateHandover();
  const form = useForm<HandoverRequest>({
    initialValues: {
      cashReceived: 0,
      cashReturned: 0,
      note: '',
      shift: 0,
      date: new Date(),
      outlet: outlet!.id,
    },
  });

  async function handleSubmit() {
    await mutateAsync(
      { data: form.values },
      {
        onSuccess: () => {
          notifications.show({
            message: 'Laporan berhasil dibuat',
            color: 'green',
          });
          navigate('/handover');
        },
        onError: ({ response }) => {
          form.setErrors((response?.data as any).errors);
        },
      }
    );
  }

  return (
    <main>
      <Navbar title="Laporan Serah Terima" to="/" withBorder />

      <section className="px-5 space-y-2">
        <DateInput
          {...form.getInputProps('date')}
          label="Tanggal"
          readOnly
          valueFormat="dddd, D MMMM YYYY"
        />

        <ShiftSelect
          {...form.getInputProps('shift')}
          company={outlet?.company.id}
          value={form.values['shift'] != 0 ? form.values['shift'].toString() : ''}
          onChange={(v) => form.setFieldValue('shift', parseInt(v ?? ''))}
          required
          label="Shift"
          placeholder="Pilih Shift"
        />

        <NumberInput
          {...form.getInputProps('cashReceived')}
          required
          label="Total Penerimaan"
          icon={<span className="text-xs">Rp</span>}
        />

        <Textarea
          {...form.getInputProps('note')}
          required
          label="Catatan"
          placeholder="Tambahkan catatan"
        />
      </section>

      <section className="px-5 my-4">
        <div className="mb-3">
          <h2 className="text-base font-semibold">Penjualan Terakhir</h2>
        </div>

        <SalesSummaries status="accepted" outlet={outlet?.id} />
      </section>

      <div className="fixed bottom-0 w-full max-w-md px-5 bg-white py-4">
        <Button fullWidth onClick={handleSubmit} loading={isLoading}>
          Simpan
        </Button>
      </div>
    </main>
  );
};
