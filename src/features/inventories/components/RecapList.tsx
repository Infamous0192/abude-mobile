import { Badge, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import { dayjs } from '@/lib/dayjs';

import { useInfiniteRecaps } from '../api';
import { Recapitulation, RecapitulationQuery } from '../types';

type Props = RecapitulationQuery;

export const RecapList: React.FC<Props> = ({ ...props }) => {
  const { data } = useInfiniteRecaps({ params: { limit: 10, ...props } });

  const recaps =
    data?.pages.reduce((prev, { result }) => [...prev, ...result], [] as Recapitulation[]) ?? [];

  return (
    <div className="space-y-4">
      {recaps.map((recap) => (
        <div key={recap.id} className="bg-white px-4 py-3 rounded-md shadow-lg shadow-gray-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
            <Badge variant="light" radius="sm">
              {recap.code}
            </Badge>
            <div className="text-xs text-gray-600 text-right">
              <div>{dayjs(recap.date).format('DD/MM/YYYY HH:mm')}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-2 mb-2">
            <div>
              <div className="text-xs text-gray-600">Barang Masuk</div>
              <div className="text-sm font-bold">
                {Number(recap.items.reduce((prev, curr) => prev + curr.stockIn, 0)).toLocaleString(
                  'id-ID'
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600">Barang Keluar</div>
              <div className="text-sm font-bold">
                {Number(recap.items.reduce((prev, curr) => prev + curr.stockOut, 0)).toLocaleString(
                  'id-ID'
                )}
              </div>
            </div>
          </div>

          <Button
            size="xs"
            variant="light"
            fullWidth
            component={Link}
            to={`/stock/recap/${recap.id}`}
          >
            Detail
          </Button>
        </div>
      ))}
    </div>
  );
};
