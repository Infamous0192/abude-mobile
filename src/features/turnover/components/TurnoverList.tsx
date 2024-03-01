import { ActionIcon, Anchor, Button, Loader, Table } from '@mantine/core';
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
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Tanggal</Table.Th>
              <Table.Th>Pemasukan</Table.Th>
              <Table.Th>Pengeluaran</Table.Th>
              <Table.Th>Link</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {turnovers?.map((turnover) => (
              <Table.Tr key={turnover.id}>
                <Table.Td>{dayjs(turnover.date).format('DD/MM/YYYY')}</Table.Td>
                <Table.Td className="text-right">{formatCurrency(turnover.income ?? 0)}</Table.Td>
                <Table.Td className="text-right">{formatCurrency(turnover.expense ?? 0)}</Table.Td>
                <Table.Td>
                  <Anchor href={turnover.evidence} target="_blank">
                    Lihat
                  </Anchor>
                </Table.Td>
                <Table.Td className="flex items-center space-x-2">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    radius="lg"
                    color="blue"
                    onClick={handleUpdate(turnover)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    radius="lg"
                    color="red"
                    onClick={handleDelete(turnover)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>

      <div className="mt-4">
        {!isFetching && turnovers?.length == 0 && <div>Data tidak ditemukan</div>}
        {isFetching ? (
          <div className="flex items-center justify-center py-2">
            <Loader type="dots" />
          </div>
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
