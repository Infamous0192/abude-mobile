import { Drawer, LoadingOverlay } from '@mantine/core';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useHandover } from '../api';

type Props = {
  handoverId: number | null;
  onClose: () => void;
};

export const HandoverDetail: React.FC<Props> = ({ handoverId, onClose }) => {
  const { data, isLoading, isError } = useHandover({
    id: handoverId ?? 0,
    config: { enabled: handoverId != null },
  });

  return (
    <Drawer
      opened={handoverId != null}
      onClose={onClose}
      title={<div className="font-bold">Detail Serah Terima</div>}
      padding="lg"
      position="bottom"
      size="md"
    >
      <LoadingOverlay visible={isLoading || isError} />
      {data && (
        <section className="pb-8">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Total Setoran</div>
              <div className="font-bold">{formatCurrency(data.cashReceived)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Total Penjualan</div>
              <div className="font-bold">{formatCurrency(data.salesTotal)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Total Pembelian</div>
              <div className="font-bold">{formatCurrency(data.purchasesTotal)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">Tanggal</div>
              <div className="font-bold">{dayjs(data.date).format('dddd, D MMMM YYYY')}</div>
            </div>
            <div>
              <div className="text-gray-600 mb-1">Catatan</div>
              <p className="text-sm">{data.note || '-'}</p>
            </div>
            <div className="border-t-2 border-gray-200 border-dashed pt-2">
              <div className="text-gray-900 font-bold mb-1">Penjualan</div>
            </div>
            {data.sales.length > 0
              ? data.sales.map((item, i) => (
                  <div
                    key={`s_${item.product.id}_${i}`}
                    className="flex items-start justify-between mb-3"
                  >
                    <div>
                      <div className="text-gray-900 font-bold">{item.product.name}</div>
                      <div className="text-gray-500 text-xs font-medium">
                        {item.quantity} x {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(item.total)}</div>
                      <div className="text-xs text-gray-500">
                        {dayjs(item.date).format('D MMMM YYYY')}
                      </div>
                    </div>
                  </div>
                ))
              : '-'}
            <div className="border-t-2 border-gray-200 border-dashed pt-2">
              <div className="text-gray-900 font-bold mb-1">Pembelian</div>
            </div>
            {data.purchases.length > 0
              ? data.purchases.map((item, i) => (
                  <div
                    key={`p_${item.product.id}_${i}`}
                    className="flex items-start justify-between mb-3"
                  >
                    <div>
                      <div className="text-gray-900 font-bold">{item.product.name}</div>
                      <div className="text-gray-500 text-xs font-medium">
                        {item.quantity} x {formatCurrency(item.price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatCurrency(item.total)}</div>
                      <div className="text-xs text-gray-500">
                        {dayjs(item.date).format('D MMMM YYYY')}
                      </div>
                    </div>
                  </div>
                ))
              : '-'}
          </div>
        </section>
      )}
    </Drawer>
  );
};
