import { ActionIcon, Anchor, Button, Table } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { dayjs } from '@/lib/dayjs';

import { useDeleteHandoverProof, useInfiniteHandoverProofs } from '../api';
import { HandoverProof, HandoverProofQuery } from '../types';

import { HandoverProofForm } from './HandoverProofForm';

export const HandoverProofList: React.FC<HandoverProofQuery> = (params) => {
  const deleteMutation = useDeleteHandoverProof();
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteHandoverProofs({
    params,
  });

  const handoverProofs = data?.pages.reduce(
    (prev, { result }) => [...prev, ...result],
    [] as HandoverProof[]
  );

  function handleDelete(handoverProof: HandoverProof) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Bukti',
        children: <div className="text-sm">Apakah anda yakin untuk menghapus data ini?</div>,
        centered: true,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id: handoverProof.id },
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

  function handleUpdate(handoverProof: HandoverProof) {
    return () => {
      modals.open({
        title: 'Update Barang',
        children: (
          <HandoverProofForm handoverProof={handoverProof} outlet={params.outlet as number} />
        ),
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
              <th>Link</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {handoverProofs?.map((handoverProof) => (
              <tr key={handoverProof.id}>
                <td>{dayjs(handoverProof.date).format('DD/MM/YYYY')}</td>
                <td>
                  <Anchor href={handoverProof.evidence} target="_blank">
                    Lihat
                  </Anchor>
                </td>
                <td className="flex items-center space-x-2">
                  <ActionIcon
                    size="xs"
                    radius="lg"
                    color="blue"
                    onClick={handleUpdate(handoverProof)}
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    radius="lg"
                    color="red"
                    onClick={handleDelete(handoverProof)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="mt-4">
        {handoverProofs?.length == 0 && <div>Data tidak ditemukan</div>}
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
