import { IconAdjustments, IconDownload, IconFile3d } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { formatCurrency } from '@/utils/format';

export const Inventories: React.FC = () => {
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
            to="/stock/summary"
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

        <div className="rounded-lg bg-white shadow-lg p-4">
          <div className="flex pb-1.5 mb-1.5 border-b border-gray-200">
            <div className="flex-grow">
              <div className="text-xs text-blue-600">Bahan Baku</div>
              <div className="text-base text-gra-900 font-bold">Teh Celup</div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-xs text-gray-600">Harga Rerata</div>
              <div className="text-sm font-bold">{formatCurrency(50000)}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div>
              <div className="text-xs text-gray-600">Total Persediaan</div>
              <div className="text-sm font-bold">
                {Number(5255).toLocaleString('id-ID')} <span className="text-xs">pcs</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Total Aset</div>
              <div className="text-sm font-bold">{formatCurrency(50000)}</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
