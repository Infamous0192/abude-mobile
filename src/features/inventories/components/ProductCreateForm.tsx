import { Button, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateProduct } from '../api';
import { ProductDTO } from '../types';

type Props = {
  company: number;
  onSuccess?: VoidFunction;
};

export const ProductCreateForm: React.FC<Props> = ({ company, onSuccess }) => {
  const form = useForm<ProductDTO>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      unit: '',
      company,
      type: undefined,
      isDefault: false,
    },
  });
  const { mutateAsync, isPending } = useCreateProduct();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Produk berhasil dibuat',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
      }
    );
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <TextInput
          {...form.getInputProps('name')}
          label="Nama"
          placeholder="Masukan nama produk"
          required
        />
        <Textarea
          {...form.getInputProps('description')}
          label="Deskripsi"
          placeholder="Masukan deskripsi (opsional)"
        />
        <NumberInput
          {...form.getInputProps('price')}
          label="Harga"
          required
          hideControls
          leftSection={<span className="text-xs">Rp.</span>}
        />
        <TextInput
          {...form.getInputProps('unit')}
          placeholder="Masukan Satuan"
          label="Satuan"
          required
        />
        <Select
          {...form.getInputProps('type')}
          value={form.values['type'] ?? ''}
          label="Kategori"
          placeholder="Pilih Kategori"
          required
          data={[
            { label: 'Pembelian', value: 'purchase' },
            { label: 'Penjualan', value: 'sale' },
          ]}
        />
        <Select
          {...form.getInputProps('isDefault')}
          label="Default?"
          required
          data={[
            { label: 'Ya', value: 'true' },
            { label: 'Tidak', value: 'false' },
          ]}
          value={form.values['isDefault'] ? 'true' : 'false'}
          onChange={(v) => form.setFieldValue('isDefault', v == 'true')}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isPending}
        >
          Batal
        </Button>
        <Button type="submit" loading={isPending}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
