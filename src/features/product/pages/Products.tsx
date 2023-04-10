import { Button } from '@mantine/core';
import { openModal } from '@mantine/modals';

import { ProductCreateForm, ProductList } from '../components';

export const Products: React.FC = () => {
  function handleAdd() {
    openModal({
      title: 'Tambah Barang',
      children: <ProductCreateForm />,
    });
  }

  return (
    <main>
      <header className="px-5 mt-8 mb-4 flex items-center justify-between">
        <h1 className="font-bold text-xl">Barang</h1>
        <Button size="xs" onClick={handleAdd}>
          Tambah
        </Button>
      </header>

      <ProductList />
    </main>
  );
};
