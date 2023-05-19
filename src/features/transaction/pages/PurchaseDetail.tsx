import { ActionIcon, Button, Menu } from '@mantine/core';
import { IconArrowBarToDown, IconChevronLeft, IconDots } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { usePurchase } from '../api';
import { PurchaseStatus } from '../components';

export const PurchaseDetail: React.FC = () => {
  const { id } = useParams<'id'>();
  const { data, isLoading, isError } = usePurchase({ id: parseInt(id!) });

  if (isLoading || isError) return null;

  return (
    <main className="bg-white min-h-screen pb-6 relative">
      <header className="px-4 sticky top-0 z-10 bg-white py-3.5">
        <Link to="/" className="flex items-center">
          <ActionIcon variant="transparent">
            <IconChevronLeft className="text-gray-800" />
          </ActionIcon>
          <div className="font-bold ml-4">Kembali</div>
        </Link>
      </header>

      <section className="flex flex-col items-center justify-center mt-8">
        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
          <IconArrowBarToDown className="w-8 h-8" />
        </div>
        <div className="font-bold text-lg mt-2">Pembelian</div>
      </section>

      <section className="px-5 py-4">
        <section className="border-b border-dashed border-gray-400 pb-4">
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-600 font-medium">Kode</div>
            <div className="font-bold">{data.code}</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-600 font-medium">Tanggal Transaksi</div>
            <div className="font-bold">{dayjs(data.createdAt).format('D MMMM YYYY HH:mm')}</div>
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-600 font-medium">Status</div>
            <PurchaseStatus status={data.status} />
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <div className="text-gray-600 font-medium">Pegawai</div>
            <div className="font-bold">{data.user.name}</div>
          </div>
          <div className="text-sm mt-3">
            <div className="text-gray-600 font-medium mb-1">Catatan</div>
            <div className="text-xs font-medium">{data.note}</div>
          </div>
        </section>

        <div className="py-3">
          {data.items.map((item) => (
            <div key={item.id} className="flex justify-between mb-3 last:mb-0">
              <div>
                <div className="font-bold">{item.product.name}</div>
                <div className="text-gray-600 text-xs font-medium">
                  {item.quantity} {item.product.unit} x {formatCurrency(item.price)}
                </div>
              </div>
              <div className="font-bold">{formatCurrency(item.total)}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t text-base border-dashed border-gray-400 pt-4">
          <div className="font-bold">Total</div>
          <div className="font-bold">{formatCurrency(data.total)}</div>
        </div>
      </section>

      <div className="fixed bottom-0 bg-white max-w-md py-4 px-5 flex w-full items-center space-x-4 border-t border-gray-200">
        <Button fullWidth>Cetak</Button>
        <Menu position="top-end" width={200}>
          <Menu.Target>
            <ActionIcon variant="outline" color="gray" size="lg">
              <IconDots />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item color="red">Batalkan Pesanan</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </main>
  );
};
