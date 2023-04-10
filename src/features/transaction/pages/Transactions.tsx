import { useState } from 'react';

import { TransactionList, TransactionTab } from '../components';
import { TransactionQuery } from '../types';

const defaultQuery: TransactionQuery = {
  category: undefined,
};

export const Transactions: React.FC = () => {
  const [query, setQuery] = useState(defaultQuery);

  return (
    <main>
      <header className="px-5 mt-8 mb-4">
        <h1 className="font-bold text-xl">Riwayat Transaksi</h1>
      </header>

      <TransactionTab
        onChange={(status) => {
          const category = status == '' ? undefined : (status as TransactionQuery['category']);
          setQuery({ category });
        }}
      />

      <section>
        <TransactionList query={query} />
      </section>
    </main>
  );
};
