import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/navigation';

import { SummaryList } from '../components';

export const StockSummary: React.FC = () => {
  return (
    <main className="pt-14">
      <Navbar title="Rekapitulasi Stok" position="center" to="/inventory" />

      <div className="p-4">
        <div className="font-bold mb-2.5">Riwayat Rekapitulasi</div>

        <SummaryList />
      </div>

      <footer className="max-w-md bottom-0 fixed bg-white py-4 w-full border-t border-gray-50 px-5">
        <div className="flex items-center justify-between">
          <Button fullWidth leftSection={<IconPlus size={16} />} component={Link} to="/stock/recap">
            Tambah Rekapitulasi
          </Button>
        </div>
      </footer>
    </main>
  );
};
