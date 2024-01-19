import { Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { OutletSelect } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';

import { useCreateHandoverProof, useUpdateHandoverProof } from '../api';
import { HandoverProof, HandoverProofRequest } from '../types';

type Props = {
  handoverProof?: HandoverProof;
  outlet?: number;
  onSuccess?: VoidFunction;
};

export const HandoverProofForm: React.FC<Props> = ({ handoverProof, outlet, onSuccess }) => {
  const form = useForm<HandoverProofRequest>({
    initialValues: {
      date: handoverProof?.date ? new Date(handoverProof.date) : new Date(),
      evidence: handoverProof?.evidence ?? '',
      outlet: handoverProof?.outlet.id ?? outlet,
    },
  });
  const createMutation = useCreateHandoverProof();
  const updateMutation = useUpdateHandoverProof();

  const handleSubmit = form.onSubmit(async (values) => {
    if (handoverProof) {
      await updateMutation.mutateAsync(
        {
          id: handoverProof.id,
          data: {
            ...values,
            outlet: values.outlet ? parseInt(values.outlet.toString()) : undefined,
            date: dayjs(values.date).utc(true).startOf('D').toDate(),
          },
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
        {
          data: {
            ...values,
            outlet: values.outlet ? parseInt(values.outlet.toString()) : undefined,
            date: dayjs(values.date).utc(true).startOf('D').toDate(),
          },
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
        {!outlet && (
          <OutletSelect
            {...form.getInputProps('outlet')}
            label="Outlet"
            placeholder="Pilih Outlet"
          />
        )}
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
