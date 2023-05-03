import { Button } from '@mantine/core';
import { IconArrowBarToDown, IconArrowBarUp, IconReceipt } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { MenuList } from '@/components/navigation';
import { useAuth } from '@/features/auth';
import { TransactionList } from '@/features/transaction';

export const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <main>
      <section className="bg-blue-800 w-full rounded-b-xl px-5 pt-8 pb-20">
        <button
          onClick={() => logout()}
          className="bg-blue-400 text-blue-50 px-2 py-1 rounded-full text-xs mb-3 inline-block"
        >
          Outlet Banjarmasin Utara
        </button>

        <div className="text-white font-black text-xl">Dwa Meizadewa</div>
        <div className="text-sm font-semibold text-white">Admin Outlet</div>
      </section>

      <section className="bg-white mx-auto max-w-xs w-full -mt-14 shadow shadow-gray-200 rounded-xl">
        <div className="w-full grid grid-cols-3 divide-x divide-gray-300 py-4">
          <Link to="/sales" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconArrowBarUp className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Penjualan</div>
          </Link>
          <Link to="/purchases" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconArrowBarToDown className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Pembelian</div>
          </Link>
          <Link to="/transaction" className="px-4 flex flex-col items-center justify-center">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <IconReceipt className="w-7 h-7" />
            </div>
            <div className="text-xs mt-1">Riwayat</div>
          </Link>
        </div>
      </section>

      <section className="px-5 my-8">
        <MenuList
          navigations={[
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

      <section className="my-6 pb-24">
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
