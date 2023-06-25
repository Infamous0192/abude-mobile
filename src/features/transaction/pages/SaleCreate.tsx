import { ActionIcon, Button, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconChevronLeft, IconCirclePlus } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';
import { Product, ProductPick, useProducts } from '@/features/product';

import { useCreateSale } from '../api';
import { SaleItemList, SaleSubmit, SaleSummary } from '../components';
import { SaleRequest } from '../types';

const initialValues: Omit<SaleRequest, 'sourceId' | 'date'> = {
  customer: 'Umum',
  source: 'outlet',
  note: '',
  items: [],
};

export const SaleCreate: React.FC = () => {
  const { outlet } = useOutletContext();
  const { data } = useProducts({
    params: { company: outlet?.company.id, limit: -1, category: 'sale' },
  });
  const { mutateAsync } = useCreateSale();
  const form = useForm<SaleRequest>({
    initialValues: {
      ...initialValues,
      sourceId: outlet?.id ?? 0,
      date: new Date(),
    },
  });

  const products = data?.result ?? [];
  const defaults = data?.result.filter(({ isDefault }) => isDefault);

  useEffect(() => {
    if (!data || !defaults) return;

    form.setFieldValue('items', [
      ...defaults.map(({ id, price }) => ({ product: id, quantity: 1, price })),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleItemChange(items: SaleRequest['items']) {
    form.setFieldValue('items', items);
  }

  function handleAddItem(product: Product) {
    form.setFieldValue('items', [
      ...form.values['items'],
      { product: product.id, quantity: 1, price: product.price },
    ]);
    modals.closeAll();
  }

  function handleAddProduct() {
    const items = form.values['items'];

    modals.open({
      title: 'Tambah Barang',
      children: (
        <ProductPick
          products={products.filter((product) => {
            return !(items.filter((item) => item.product == product.id).length > 0);
          })}
          onSubmit={handleAddItem}
        />
      ),
    });
  }

  async function handleSubmit() {
    await mutateAsync(
      { data: form.values },
      {
        onSuccess: () => {
          notifications.show({
            color: 'green',
            message: 'Penjualan berhasil dibuat',
            autoClose: 1000,
          });
          form.setValues({
            ...form.values,
            date: new Date(),
            ...initialValues,
            items: [
              ...(defaults ?? []).map(({ id, price }) => ({ product: id, quantity: 1, price })),
            ],
          });
        },
        onError: () => {
          notifications.show({
            color: 'red',
            message: 'Penjualan gagal dibuat',
            autoClose: 10000,
          });
        },
      }
    );
  }

  return (
    <main className="mb-32">
      <header className="px-4 sticky top-0 z-10 bg-white py-3.5">
        <Link to="/" className="flex items-center">
          <ActionIcon variant="transparent">
            <IconChevronLeft className="text-gray-800" />
          </ActionIcon>
          <div className="font-bold ml-4">Penjualan</div>
        </Link>
      </header>

      <section className="px-5 space-y-3 pb-3 mt-3">
        <DateInput
          {...form.getInputProps('date')}
          label="Tanggal"
          variant="filled"
          valueFormat="D MMMM YYYY HH:mm"
        />
        <TextInput
          {...form.getInputProps('customer')}
          label="Nama Customer"
          variant="filled"
          placeholder="Masukan nama customer"
          withAsterisk
        />
        <Textarea
          {...form.getInputProps('note')}
          label="Catatan"
          placeholder="Tambahkan catatan"
          variant="filled"
        />
      </section>

      <section className="px-5 py-2">
        <h3 className="text-sm text-gray-900 mb-1.5 font-medium">Barang</h3>
        <SaleItemList
          products={products}
          items={form.values['items']}
          onChange={handleItemChange}
        />

        <div className="flex items-center justify-end">
          <Button
            variant="subtle"
            leftIcon={<IconCirclePlus size={16} />}
            size="xs"
            onClick={handleAddProduct}
            disabled={products?.length == form.values['items'].length}
          >
            Tambah Barang
          </Button>
        </div>
      </section>

      <SaleSummary items={form.values['items']} products={products} />

      <SaleSubmit items={form.values['items']} onSubmit={handleSubmit} />
    </main>
  );
};
