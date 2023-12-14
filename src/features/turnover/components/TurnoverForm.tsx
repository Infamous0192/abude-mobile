import { Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { dayjs } from '@/lib/dayjs';

import { useCreateTurnover, useUpdateTurnover } from '../api';
import { Turnover, TurnoverRequest } from '../types';

type Props = {
  turnover?: Turnover;
  outlet: number;
  onSuccess?: VoidFunction;
};

export const TurnoverForm: React.FC<Props> = ({ turnover, outlet, onSuccess }) => {
  const form = useForm<TurnoverRequest>({
    initialValues: {
      date: turnover?.date ? new Date(turnover.date) : new Date(),
      evidence: turnover?.evidence ?? '',
      outlet: turnover?.outlet.id ?? outlet,
    },
  });
  const createMutation = useCreateTurnover();
  const updateMutation = useUpdateTurnover();

  const handleSubmit = form.onSubmit(async (values) => {
    if (turnover) {
      await updateMutation.mutateAsync(
        {
          id: turnover.id,
          data: { ...values, date: dayjs(values.date).utc(true).startOf('D').toDate() },
        },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess() {
            if (onSuccess) {
              onSuccess();
            }
            notifications.show({
              message: 'Bukti berhasil diubah',
              color: 'green',
              icon: <IconCheck />,
            });
            modals.closeAll();
          },
        }
      );
    } else {
      await createMutation.mutateAsync(
        { data: { ...values, date: dayjs(values.date).utc(true).startOf('D').toDate() } },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess() {
            if (onSuccess) {
              onSuccess();
            }
            notifications.show({
              message: 'Bukti berhasil dibuat',
              color: 'green',
              icon: <IconCheck />,
            });
            modals.closeAll();
          },
        }
      );
    }
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <DateInput
          {...form.getInputProps('date')}
          label="Tanggal"
          required
          valueFormat="D MMMM YYYY"
        />
        <TextInput
          {...form.getInputProps('evidence')}
          placeholder="Masukan Bukti"
          label="Bukti (Link)"
          required
        />
      </div>

      <div className="space-y-2 mt-4">
        <Button
          type="submit"
          loading={createMutation.isLoading || updateMutation.isLoading}
          fullWidth
          size="xs"
        >
          Simpan
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={createMutation.isLoading || updateMutation.isLoading}
          fullWidth
          size="xs"
        >
          Batal
        </Button>
      </div>
    </form>
  );
};
