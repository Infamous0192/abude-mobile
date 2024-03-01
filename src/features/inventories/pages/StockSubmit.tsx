import { Button, Table, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';
import { Navbar } from '@/components/navigation';
import { useOutletContext } from '@/features/outlet';
import { formatCurrency } from '@/utils/format';

import { useCreateRecap, useStockSummary } from '../api';
import { RecapitulationDTO } from '../types';

export const StockSubmit: React.FC = () => {
  const { outlet } = useOutletContext();
  const { data, isLoading, isError } = useStockSummary({ params: { outlet: outlet?.id } });
  const { mutateAsync } = useCreateRecap();
  const navigate = useNavigate();
  const form = useForm<RecapitulationDTO>({
    initialValues: {
      date: new Date(),
      employee: undefined,
      notes: undefined,
      outlet: outlet?.id,
    },
  });

  function handleSubmit() {
    modals.openConfirmModal({
      title: 'Buat Rekapitulasi',
      children: <div className="text-sm">Apakah anda yakin data yang dimasukan sudah benar?</div>,
      centered: true,
      closeOnConfirm: false,
      onConfirm: async () => {
        await mutateAsync(
          { data: form.values },
          {
            onSuccess: () => {
              notifications.show({
                message: 'Rekapitulasi berhasil dibuat',
                color: 'green',
              });
              navigate('/stock/recap');
            },
            onError: ({ response }) => {
              if (response?.data) {
                form.setErrors((response?.data as any).errors);
              } else if (response?.data.message) {
                notifications.show({
                  message: response?.data.message,
                  color: 'red',
                });
              }
            },
            onSettled: () => {
              modals.closeAll();
            },
          }
        );
      },
    });
  }

  if (isLoading || isError) return <LoadingScreen />;

  return (
    <main className="pt-14 pb-24">
      <Navbar title="Tambah Rekapitulasi" position="center" to="/stock/recap" />

      <div className="bg-white px-5 py-4 my-1">
        <div className="space-y-2">
          <DateInput
            {...form.getInputProps('date')}
            label="Tanggal"
            placeholder="Masukan Tanggal"
            readOnly
            variant="filled"
            valueFormat="D MMMM YYYY"
          />
          <TextInput
            {...form.getInputProps('employee')}
            label="Penanggung Jawab"
            placeholder="Masukan Penanggung Jawab"
          />
          <Textarea
            {...form.getInputProps('notes')}
            label="Catatan"
            placeholder="Masukan Catatan"
          />
        </div>
      </div>

      <div className="bg-white my-2">
        <div className="px-4 pt-4">
          <h4 className="font-bold">Mutasi Persediaan</h4>
        </div>

        <div className="relative overflow-x-auto">
          <Table striped withRowBorders={false} stickyHeader withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Barang</Table.Th>
                <Table.Th>Persediaan Awal</Table.Th>
                <Table.Th>Barang Masuk</Table.Th>
                <Table.Th>Barang Keluar</Table.Th>
                <Table.Th>Persediaan Akhir</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.length == 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5} className="py-2 text-center">
                    Tidak ada mutasi
                  </Table.Td>
                </Table.Tr>
              )}
              {data?.map((v) => (
                <Table.Tr key={`s_${v.product.id}`}>
                  <Table.Td className="whitespace-nowrap">{v.product.name}</Table.Td>
                  <Table.Td>{v.available}</Table.Td>
                  <Table.Td>{v.stockIn}</Table.Td>
                  <Table.Td>{v.stockOut}</Table.Td>
                  <Table.Td>{v.available + v.stockIn - v.stockOut}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>

      <div className="bg-white my-2">
        <div className="px-4 pt-4">
          <h4 className="font-bold">Mutasi Saldo</h4>
        </div>

        <div className="relative overflow-x-auto">
          <Table striped withRowBorders={false} stickyHeader withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Barang</Table.Th>
                <Table.Th>Saldo Awal</Table.Th>
                <Table.Th>Penjualan</Table.Th>
                <Table.Th>Pembelian</Table.Th>
                <Table.Th>Saldo Akhir</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.length == 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5} className="py-2 text-center">
                    Tidak ada mutasi
                  </Table.Td>
                </Table.Tr>
              )}
              {data?.map((v) => (
                <Table.Tr key={`s_${v.product.id}`}>
                  <Table.Td className="whitespace-nowrap">{v.product.name}</Table.Td>
                  <Table.Td>{formatCurrency(v.totalValue)}</Table.Td>
                  <Table.Td>{formatCurrency(v.valueIn)}</Table.Td>
                  <Table.Td>{formatCurrency(v.valueOut)}</Table.Td>
                  <Table.Td>{formatCurrency(v.totalValue + v.valueIn - v.valueOut)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>

      <footer className="max-w-md bottom-0 fixed bg-white py-4 w-full border-t border-gray-50 px-5">
        <div className="flex items-center justify-between">
          <Button fullWidth onClick={handleSubmit}>
            Konfirmasi
          </Button>
        </div>
      </footer>
    </main>
  );
};
