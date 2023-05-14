import { Button, NumberInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { Navbar } from '@/components/navigation';
import { useOutletContext } from '@/features/outlet';
import { SalesSummary } from '@/features/transaction';

import { useCreateHandover } from '../api';
import { ShiftPick } from '../components';
import { HandoverRequest } from '../types';

export const Handovers: React.FC = () => {
  const { outlet } = useOutletContext();
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
        },
        onError: ({ response }) => {
          form.setErrors((response?.data as any).errors);
        },
      }
    );
  }

  return (
    <main>
      <Navbar title="Laporan Serah Terima" withBorder />

      <section className="px-5 space-y-2">
        <DateInput
          {...form.getInputProps('date')}
          label="Tanggal"
          readOnly
          valueFormat="dddd, DD MMMM YYYY"
        />

        <ShiftPick
          {...form.getInputProps('shift')}
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

        <SalesSummary status="accepted" outlet={outlet?.id} />
      </section>

      <div className="fixed bottom-0 w-full max-w-md px-5 bg-white py-4">
        <Button fullWidth onClick={handleSubmit} loading={isLoading}>
          Simpan
        </Button>
      </div>
    </main>
  );
};
