import { Badge, Button } from '@mantine/core';
import dayjs from 'dayjs';

export const SummaryList: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-white px-4 py-3 rounded-md shadow-lg shadow-gray-200">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
              <Badge variant="light" radius="sm">
                SM-01232
              </Badge>
              <div className="text-xs text-gray-600 text-right">
                <div>{dayjs(new Date()).add(i, 'd').format('DD/MM/YYYY HH:mm')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-2 mb-2">
              <div>
                <div className="text-xs text-gray-600">Barang Masuk</div>
                <div className="text-sm font-bold">{Number(5255).toLocaleString('id-ID')}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Barang Keluar</div>
                <div className="text-sm font-bold">{Number(500).toLocaleString('id-ID')}</div>
              </div>
            </div>

            <Button size="xs" variant="light" fullWidth>
              Detail
            </Button>
          </div>
        ))}
    </div>
  );
};
