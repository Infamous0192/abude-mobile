import { IconAdjustments, IconDownload, IconFile3d } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { useOutletContext } from '@/features/outlet';
import { formatCurrency } from '@/utils/format';

import { StockList } from '../components';

export const Inventories: React.FC = () => {
  const { outlet } = useOutletContext();

  return (
    <main className="py-14">
      <Navbar title="Inventaris" backButton={false} />

      <section className="px-5 my-3">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <Link
            to="/purchase/add"
            className="transition flex flex-col items-center bg-white rounded-lg py-4 shadow-lg shadow-gray-200 border border-gray-100 hover:border-blue-400 active:border-blue-400"
          >
            <div className="p-2 block w-fit rounded-md bg-blue-100 text-blue-600 mb-2">
              <IconDownload size={24} />
            </div>
            <h3 className="px-2 font-semibold text-gray-600">Pembelian</h3>
          </Link>
          <Link
            to="/stock/recap"
            className="transition flex flex-col items-center bg-white rounded-lg py-4 shadow-lg shadow-gray-200 border border-gray-100 hover:border-blue-400 active:border-blue-400"
          >
            <div className="p-2 block w-fit rounded-md bg-green-100 text-green-600 mb-2">
              <IconFile3d size={24} />
            </div>
            <h3 className="px-2 font-semibold text-gray-600">Rekapitulasi Stok</h3>
          </Link>
          <Link
            to="/stock/adjustment"
            className="transition flex flex-col items-center bg-white rounded-lg py-4 shadow-lg shadow-gray-200 border border-gray-100 hover:border-blue-400 active:border-blue-400"
          >
            <div className="p-2 block w-fit rounded-md bg-orange-100 text-orange-600 mb-2">
              <IconAdjustments size={24} />
            </div>
            <h3 className="px-2 font-semibold text-gray-600">Penyesuaian Stok</h3>
          </Link>
        </div>
      </section>

      <section className="px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-lg shadow-gray-300 rounded-md rounded-l-none border-l-4 border-blue-500 p-4">
            <div className="text-gray-600 text-sm">Total Persediaan</div>
            <div className="font-bold">{Number(243).toLocaleString('id-ID')}</div>
          </div>
          <div className="bg-white shadow-lg shadow-gray-300 rounded-md rounded-l-none border-l-4 border-orange-500 p-4">
            <div className="text-gray-600 text-sm">Total Aset</div>
            <div className="font-bold">{formatCurrency(2_500_000)}</div>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-bold">Persediaan</h2>
        </div>

        <StockList outlet={outlet?.id} />
      </section>
    </main>
  );
};
