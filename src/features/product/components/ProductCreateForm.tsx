import { Button, NumberInput, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateProduct, useSuppliers } from '../api';
import { ProductRequest } from '../types';

type Props = {
  company: number;
  onSuccess?: VoidFunction;
};

export const ProductCreateForm: React.FC<Props> = ({ company, onSuccess }) => {
  const form = useForm<ProductRequest>({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      unit: '',
      company,
      category: undefined,
      supplier: undefined,
    },
  });
  const { mutateAsync, isLoading } = useCreateProduct();
  const { data } = useSuppliers({ params: { limit: -1, company } });

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
        <TextInput {...form.getInputProps('name')} label="Nama" required />
        <Textarea {...form.getInputProps('description')} label="Deskripsi" />
        <NumberInput
          {...form.getInputProps('price')}
          label="Harga"
          required
          hideControls
          icon={<span className="text-xs">Rp.</span>}
        />
        <TextInput
          {...form.getInputProps('unit')}
          placeholder="Masukan Satuan"
          label="Satuan"
          required
        />
        <Select
          {...form.getInputProps('category')}
          value={form.values['category'] ?? ''}
          label="Kategori"
          placeholder="Pilih Kategori"
          required
          data={[
            { label: 'Pembelian', value: 'purchase' },
            { label: 'Penjualan', value: 'sale' },
          ]}
        />
        <Select
          {...form.getInputProps('supplier')}
          value={form.values['supplier']?.toString() ?? ''}
          label="Supplier"
          searchable
          onChange={(v) => form.setFieldValue('supplier', v ? parseInt(v) : undefined)}
          data={[
            { label: '(Tanpa Supplier)', value: '' },
            ...(data?.result ?? []).map(({ id, name }) => ({ label: name, value: id.toString() })),
          ]}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isLoading}
        >
          Batal
        </Button>
        <Button type="submit" loading={isLoading}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
