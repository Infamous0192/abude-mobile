import { TextInput, Textarea } from '@mantine/core';

import { formatCurrency } from '@/utils/format';

import { ProductList } from './ProductList';

export const SalesForm: React.FC = () => {
  return (
    <div>
      <TextInput
        label="Nama Customer"
        variant="filled"
        defaultValue="Umum"
        placeholder="Masukan nama customer"
      />
      <section className="my-4">
        <h3 className="text-base font-bold mb-2">Produk</h3>
        <ProductList />
      </section>

      <Textarea placeholder="Tambahkan catatan" variant="filled" />

      <section className="mt-6">
        <div className="bg-white shadow-lg shadow-gray-100 rounded-xl p-5 font-bold text-sm mb-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-gray-600 font-bold">Cincau</div>
              <div className="text-gray-500 text-xs font-medium">
                2 Gelas x {formatCurrency(15000)}
              </div>
            </div>
            <div>{formatCurrency(120000)}</div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-gray-500 font-semibold">Admin Fee</div>
            <div>{formatCurrency((120000 * 5) / 100)}</div>
          </div>
          <div className="flex items-center justify-between border-t border-dashed dash- border-gray-400 pt-3">
            <div>Total</div>
            <div>{formatCurrency((120000 * 5) / 100)}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
