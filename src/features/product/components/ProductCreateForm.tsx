import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { ProductRequest, Supplier } from '../types';

const suppliers: Supplier[] = [
  {
    id: 1,
    name: 'PT Ujang Makmur',
  },
  {
    id: 2,
    name: 'PT Asep Kencana',
  },
];

export const ProductCreateForm: React.FC = () => {
  const form = useForm<ProductRequest>({
    initialValues: {
      name: '',
      category: 'penjualan',
      price: 0,
      unit: '',
    },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('name')}
        label="Nama Barang"
        placeholder="Masukan nama barang"
        className="mb-2"
      />
      <NumberInput
        {...form.getInputProps('price')}
        label="Harga"
        placeholder="Masukan harga"
        className="mb-2"
        value={form.values['price'] == 0 ? '' : form.values['price']}
        hideControls
      />
      <TextInput
        {...form.getInputProps('unit')}
        label="Satuan"
        placeholder="Masukan satuan"
        className="mb-2"
      />
      <Select
        {...form.getInputProps('category')}
        label="Kategori"
        placeholder="Pilih kategori"
        className="mb-2"
        data={[
          { value: 'penjualan', label: 'Penjualan' },
          { value: 'pembelian', label: 'Pembelian' },
        ]}
      />
      <Select
        {...form.getInputProps('supplier')}
        label="Supplier"
        placeholder="Pilih supplier"
        className="mb-2"
        data={[
          { value: '', label: '(Kosong)' },
          ...suppliers.map((supplier) => ({ label: supplier.name, value: `${supplier.id}` })),
        ]}
      />
      <div className="flex items-center justify-end mt-4">
        <Button>Tambah</Button>
      </div>
    </div>
  );
};
