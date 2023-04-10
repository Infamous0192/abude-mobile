import { Button } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onChange: (status: string) => void;
};

export const TransactionTab: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<string>('');

  function handleClick(status: string) {
    return () => {
      setSelected(status);
      onChange(status);
    };
  }

  return (
    <section className="flex items-center px-5 mb-4">
      <Button
        radius="lg"
        variant={selected == '' ? 'filled' : 'light'}
        onClick={handleClick('')}
        className="mr-2"
      >
        Semua
      </Button>
      <Button
        radius="lg"
        variant={selected == 'penjualan' ? 'filled' : 'light'}
        onClick={handleClick('penjualan')}
        className="mr-2"
      >
        Penjualan
      </Button>
      <Button
        radius="lg"
        variant={selected == 'pembelian' ? 'filled' : 'light'}
        onClick={handleClick('pembelian')}
        className="mr-2"
      >
        Pembelian
      </Button>
    </section>
  );
};
