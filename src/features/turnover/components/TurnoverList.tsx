import { ActionIcon, Anchor, Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';

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
      <div className="overflow-scroll">
        <Table fontSize="xs">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Pemasukan</th>
              <th>Pengeluaran</th>
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {turnovers?.map((turnover) => (
              <tr key={turnover.id}>
                <td>{dayjs(turnover.date).format('DD/MM/YYYY')}</td>
                <td className="text-right">{formatCurrency(turnover.income ?? 0)}</td>
                <td className="text-right">{formatCurrency(turnover.expense ?? 0)}</td>
                <td>
                  <Anchor href={turnover.evidence} target="_blank">
                    Lihat
                  </Anchor>
                </td>
                <td className="flex items-center space-x-2">
                  <ActionIcon size="xs" radius="lg" color="blue" onClick={handleUpdate(turnover)}>
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon size="xs" radius="lg" color="red" onClick={handleDelete(turnover)}>
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
