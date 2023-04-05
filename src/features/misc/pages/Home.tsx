import { IconUser } from '@tabler/icons';

import { MenuList } from '@/components/navigation';
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

      <section className="px-5 my-6">
        <h2 className="font-semibold text-gray-900 text-base mb-3">Menu Utama</h2>

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
              title: 'Riwayat Transaksi',
              href: '/images/riwayat.svg',
              icon: '/images/riwayat.svg',
            },
            {
              title: 'Barang',
              href: '/images/barang.svg',
              icon: '/images/barang.svg',
            },
          ]}
        />
      </section>
    </main>
  );
};
