import { Button } from '@mantine/core';
import { IconUser } from '@tabler/icons';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { TransactionList } from '@/features/transaction';
import { dayjs } from '@/lib/dayjs';

export const Home: React.FC = () => {
  return (
    <main>
      <section className="px-5 mt-8 flex">
        <div className="flex-grow">
          <h1 className="font-bold text-lg">Abude Group</h1>
          <div className="text-sm text-gray-500 font-medium">
            {dayjs(new Date()).format('D MMMM YYYY | HH.mm')}
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="bg-blue-100 p-2 text-blue-700 rounded-full">
            <IconUser className="w-6 h-6" />
          </div>
        </div>
      </section>

      <section className="px-5 my-8">
        <MenuList
          navigations={[
            {
              title: 'Pembelian',
              href: '/purchases',
              icon: '/images/pembelian.svg',
            },
            {
              title: 'Penjualan',
              href: '/sales',
              icon: '/images/penjualan.svg',
            },
            {
              title: 'Riwayat',
              href: '/transaction',
              icon: '/images/riwayat.svg',
            },
            {
              title: 'Barang',
              href: '/product',
              icon: '/images/barang.svg',
            },
            {
              title: 'Supplier',
              href: '/supplier',
              icon: '/images/supplier.svg',
            },
            {
              title: 'Kehadiran',
              href: '/attendance',
              icon: '/images/attendance.svg',
            },
          ]}
        />
      </section>

      <section className="my-6">
        <div className="px-5 flex justify-between">
          <h2 className="text-lg font-bold mb-1">Transaksi Terbaru</h2>
        </div>
        <TransactionList />
        <div className="px-5">
          <Button variant="subtle" fullWidth component={Link} to="/transaction">
            Lihat Semua
          </Button>
        </div>
      </section>
    </main>
  );
};
