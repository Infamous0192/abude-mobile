import { ActionIcon, Badge, Button, Menu } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical } from '@tabler/icons-react';

import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useDeleteTurnover, useInfiniteTurnovers } from '../api';
import { Turnover, TurnoverQuery } from '../types';

import { TurnoverForm } from './TurnoverForm';

export const TurnoverList: React.FC<TurnoverQuery> = (params) => {
  const deleteMutation = useDeleteTurnover();
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteTurnovers({
    params,
  });

  const turnovers = data?.pages.reduce(
    (prev, { result }) => [...prev, ...result],
    [] as Turnover[]
  );

  function handleDelete(turnover: Turnover) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Bukti',
        children: <div className="text-sm">Apakah anda yakin untuk menghapus data ini?</div>,
        centered: true,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id: turnover.id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Bukti berhasil dihapus',
                  color: 'green',
                });
              },
              onError: ({ response }) => {
                if (response?.data.message) {
                  notifications.show({
                    message: response?.data.message,
                    color: 'red',
                  });
                }
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(turnover: Turnover) {
    return () => {
      modals.open({
        title: 'Update Barang',
        children: <TurnoverForm turnover={turnover} outlet={params.outlet as number} />,
        fullScreen: true,
      });
    };
  }

  if (isLoading)
    return (
      <div className="space-x-4">
        <div className="bg-white w-full rounded-md shadow-md shadow-gray-200 border border-gray-200 p-3">
          <div className="w-full flex items-center justify-between mb-4">
            <div className="bg-gray-200 rounded-md h-4 w-20 animate-pulse"></div>
          </div>

          <div className="bg-gray-200 rounded-md h-6 mb-4 w-full animate-pulse"></div>
          <div className="bg-gray-200 rounded-md h-6 w-full animate-pulse"></div>
        </div>
      </div>
    );

  return (
    <>
      <div className="space-y-4">
        {turnovers?.map((turnover) => (
          <div
            key={turnover.id}
            className="bg-white w-full rounded-md shadow-md shadow-gray-200 border border-gray-200 p-3"
          >
            <div className="w-full flex items-center justify-between">
              <Badge color="gray">{dayjs(turnover.date, 'YYYY-MM-DD').format('D MMMM YYYY')}</Badge>

              <Menu position="bottom-end" withArrow width={128}>
                <Menu.Target>
                  <ActionIcon size="xs" radius="lg">
                    <IconDotsVertical />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={handleUpdate(turnover)}>Edit</Menu.Item>
                  <Menu.Item color="red" onClick={handleDelete(turnover)}>
                    Hapus
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-300 my-3">
              <div>
                <div className="text-xs text-gray-600 font-medium">Total Pemasukan</div>
                <div className="text-sm font-bold">{formatCurrency(turnover.income ?? 0)}</div>
              </div>
              <div className="pl-4">
                <div className="text-xs text-gray-600 font-medium">Total Pengeluaran</div>
                <div className="text-sm font-bold">{formatCurrency(turnover.expense ?? 0)}</div>
              </div>
            </div>

            <div>
              <Button component="a" target="_blank" href={turnover.evidence} size="xs" fullWidth>
                Lihat Bukti
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {turnovers?.length == 0 && <div>Data tidak ditemukan</div>}
        {isFetching ? (
          <div className="text-center mt-2">loading...</div>
        ) : (
          hasNextPage && (
            <Button variant="subtle" fullWidth onClick={() => fetchNextPage()}>
              Selengkapnya
            </Button>
          )
        )}
      </div>
    </>
  );
};
