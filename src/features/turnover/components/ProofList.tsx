import { ActionIcon, Anchor, Button, Loader, Table } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import { dayjs } from '@/lib/dayjs';

import { useDeleteProof, useInfiniteProofs } from '../api';
import { Proof, ProofQuery } from '../types';

import { ProofForm } from './ProofForm';

export const ProofList: React.FC<ProofQuery> = (params) => {
  const deleteMutation = useDeleteProof();
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteProofs({
    params,
  });

  const proofs = data?.pages.reduce((prev, { result }) => [...prev, ...result], [] as Proof[]);

  function handleDelete(proof: Proof) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Bukti',
        children: <div className="text-sm">Apakah anda yakin untuk menghapus data ini?</div>,
        centered: true,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id: proof.id },
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

  function handleUpdate(proof: Proof) {
    return () => {
      modals.open({
        title: 'Update Barang',
        children: <ProofForm proof={proof} outlet={params.outlet as number} />,
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
              <Table.Th>Link</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {proofs?.map((proof) => (
              <Table.Tr key={proof.id}>
                <Table.Td>{dayjs(proof.date).format('DD/MM/YYYY')}</Table.Td>
                <Table.Td>
                  <Anchor href={proof.evidence} target="_blank">
                    Lihat
                  </Anchor>
                </Table.Td>
                <Table.Td className="flex items-center space-x-2">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    radius="lg"
                    color="blue"
                    onClick={handleUpdate(proof)}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    radius="lg"
                    color="red"
                    onClick={handleDelete(proof)}
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
        {!isFetching && proofs?.length == 0 && <div>Data tidak ditemukan</div>}
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
