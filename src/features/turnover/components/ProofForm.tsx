import { Button, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { OutletSelect } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';

import { useCreateProof, useUpdateProof } from '../api';
import { Proof, ProofDTO } from '../types';

type Props = {
  proof?: Proof;
  outlet?: number;
  onSuccess?: VoidFunction;
};

export const ProofForm: React.FC<Props> = ({ proof, outlet, onSuccess }) => {
  const form = useForm<ProofDTO>({
    initialValues: {
      date: proof?.date ? new Date(proof.date) : new Date(),
      evidence: proof?.evidence ?? '',
      outlet: proof?.outlet.id ?? outlet,
    },
  });
  const createMutation = useCreateProof();
  const updateMutation = useUpdateProof();

  const handleSubmit = form.onSubmit(async (values) => {
    if (proof) {
      await updateMutation.mutateAsync(
        {
          id: proof.id,
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
          loading={createMutation.isPending || updateMutation.isPending}
          fullWidth
          size="xs"
        >
          Simpan
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={createMutation.isPending || updateMutation.isPending}
          fullWidth
          size="xs"
        >
          Batal
        </Button>
      </div>
    </form>
  );
};
