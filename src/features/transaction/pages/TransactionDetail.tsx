import { Badge } from '@mantine/core';
import { IconCheck, IconChevronLeft } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { Transaction } from '../types';

const transaction: Transaction = {
  id: 1,
  code: 'BJM-123',
  category: 'pembelian',
  customer: 'Umum',
  items: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Cincau',
        price: 15000,
        unit: 'Cup',
        category: 'penjualan',
      },
      amount: 2,
      price: 15000,
      total: 30000,
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Pentol',
        price: 2000,
        unit: 'Cup',
        category: 'penjualan',
      },
      amount: 4,
      price: 2000,
      total: 8000,
    },
  ],
  total: 50000,
  note: 'lorem ipsum dolor sit amet',
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const TransactionDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-white min-h-screen">
      <header className="px-5 py-4 mb-6">
        <div onClick={() => navigate(-1)} aria-hidden className="flex items-center">
          <IconChevronLeft />
          <div className="font-bold ml-4">Kembali</div>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center">
        <div className="bg-green-100 p-2 rounded-full">
          <IconCheck className="text-green-600 w-8 h-8" />
        </div>
        <div className="font-bold text-lg mt-2">Pembelian</div>
      </section>

      <section className="px-5 py-4">
        <section className="border-b border-dashed border-gray-400 pb-4">
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-500 font-medium">Customer</div>
            <div className="font-bold">{transaction.customer}</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-500 font-medium">Tanggal Transaksi</div>
            <div className="font-bold">
              {dayjs(transaction.createdAt).format('D MMMM YYYY HH:mm')}
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-500 font-medium">Status</div>
            <Badge color="green">Success</Badge>
          </div>
          <div className="text-sm mt-3">
            <div className="text-gray-500 font-medium mb-1">Catatan</div>
            <div className="text-gray-800 text-xs font-medium">{transaction.note}</div>
          </div>
        </section>

        <div className="py-3">
          {transaction.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-3 last:mb-0">
              <div>
                <div className="text-gray-700 font-bold">Cincau</div>
                <div className="text-gray-500 text-xs font-medium">
                  {item.amount} {item.product.unit} x {formatCurrency(item.price)}
                </div>
              </div>
              <div className="font-bold text-sm">{formatCurrency(item.total)}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t text-base border-dashed border-gray-400 pt-4">
          <div className="font-bold">Total</div>
          <div className="font-bold">{formatCurrency(transaction.total)}</div>
        </div>
      </section>
    </main>
  );
};
