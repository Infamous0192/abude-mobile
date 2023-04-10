import { ActionIcon, Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconChevronLeft, IconCirclePlus } from '@tabler/icons';
import { Link, useNavigate } from 'react-router-dom';

import { Product, Supplier } from '@/features/product';

import { ItemPick, ProductPick, TransactionSubmit, TransactionSummary } from '../components';
import { TransactionRequest } from '../types';

const supplier: Supplier = {
  id: 1,
  name: 'Supplier 1',
};

const products: Product[] = [
  {
    id: 1,
    name: 'Cincau',
    price: 15000,
    default: true,
    supplier: supplier,
    category: 'penjualan',
    unit: 'Gelas',
  },
  {
    id: 2,
    name: 'Pentol',
    price: 2000,
    default: true,
    supplier: supplier,
    category: 'penjualan',
    unit: 'Tusuk',
  },
];

export const Sales: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<TransactionRequest>({
    initialValues: {
      customer: 'Umum',
      category: 'penjualan',
      note: '',
      items: [
        {
          amount: 1,
          price: products[0].price,
          product: products[0].id,
        },
      ],
    },
  });

  function handleItemChange(items: TransactionRequest['items']) {
    form.setFieldValue('items', items);
  }

  function handleAddItem(product: Product) {
    form.setFieldValue('items', [
      ...form.values['items'],
      { product: product.id, amount: 1, price: product.price },
    ]);
    closeAllModals();
  }

  function handleAddProduct() {
    const items = form.values['items'];

    openModal({
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

  function handleSubmit() {
    showNotification({
      color: 'green',
      message: 'Transaksi berhasil dibuat',
    });
    navigate('/');
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

      <section className="px-5 pb-3 mt-3">
        <TextInput
          {...form.getInputProps('customer')}
          label="Nama Customer"
          variant="filled"
          placeholder="Masukan nama customer"
          className="mb-3"
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
        <ItemPick products={products} items={form.values['items']} onChange={handleItemChange} />

        <div className="flex items-center justify-end">
          <Button
            variant="subtle"
            leftIcon={<IconCirclePlus size={16} />}
            size="xs"
            onClick={handleAddProduct}
            disabled={products.length == form.values['items'].length}
          >
            Tambah Barang
          </Button>
        </div>
      </section>

      <TransactionSummary items={form.values['items']} products={products} />

      <TransactionSubmit items={form.values['items']} onSubmit={handleSubmit} />
    </main>
  );
};
