import { ActionIcon, Button, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconChevronLeft, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';

import { ProductCreateForm, ProductList } from '../components';
import { ProductQuery } from '../types';

export const Products: React.FC = () => {
  const { outlet } = useOutletContext();
  const [query, setQuery] = useState<ProductQuery>({ company: outlet?.company.id, keyword: '' });
  const [params] = useDebouncedValue(query, 200);

  function handleAdd() {
    if (!outlet?.company.id) return;

    modals.open({
      title: 'Tambah Barang',
      children: <ProductCreateForm company={outlet.company.id} />,
    });
  }

  return (
    <main>
      <header className="px-4 sticky top-0 z-10 bg-white py-3.5 border-b border-gray-200">
        <Link to="/" className="flex items-center">
          <ActionIcon variant="transparent">
            <IconChevronLeft className="text-gray-800" />
          </ActionIcon>
          <div className="font-bold ml-4">Kembali</div>
        </Link>
      </header>

      <section className="flex items-center justify-between px-5 mt-7 mb-4">
        <h1 className="text-lg font-bold">Data Barang</h1>
        <Button size="xs" onClick={handleAdd}>
          Tambah
        </Button>
      </section>

      <section className="px-5 mb-1">
        <TextInput
          icon={<IconSearch size={16} />}
          placeholder="Cari barang"
          value={query.keyword}
          onChange={(e) => setQuery({ ...query, keyword: e.target.value })}
        />
      </section>

      <ProductList {...params} />
    </main>
  );
};
