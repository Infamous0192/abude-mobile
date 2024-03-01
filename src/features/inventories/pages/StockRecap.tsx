import { Table, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useParams } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';
import { Navbar } from '@/components/navigation';
import { formatCurrency } from '@/utils/format';

import { useRecap } from '../api';

export const StockRecap: React.FC = () => {
  const { id } = useParams<'id'>();
  const { data, isLoading, isError } = useRecap({ id: id as string });

  if (isLoading || isError || !data) return <LoadingScreen />;

  return (
    <main className="pt-14">
      <Navbar title="Kembali" position="left" to="/stock/recap" />

      <div className="bg-white px-5 py-4 my-1">
        <div className="space-y-2">
          <DateInput
            label="Tanggal"
            placeholder="Masukan Tanggal"
            readOnly
            variant="filled"
            valueFormat="D MMMM YYYY"
            defaultValue={new Date(data.date)}
          />
          <TextInput
            defaultValue={data.employee}
            label="Penanggung Jawab"
            placeholder="Masukan Penanggung Jawab"
            readOnly
            variant="filled"
          />
          <Textarea
            defaultValue={data.notes}
            label="Catatan"
            placeholder="Masukan Catatan"
            readOnly
            variant="filled"
          />
        </div>
      </div>

      <div className="bg-white my-2">
        <div className="px-4 pt-4">
          <h4 className="font-bold">Mutasi Persediaan</h4>
        </div>

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
            {data.items.length == 0 && (
              <Table.Tr>
                <Table.Td colSpan={5} className="py-2 text-center">
                  Tidak ada mutasi
                </Table.Td>
              </Table.Tr>
            )}
            {data.items.map((v) => (
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

      <div className="bg-white my-2">
        <div className="px-4 pt-4">
          <h4 className="font-bold">Mutasi Saldo</h4>
        </div>

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
            {data.items.length == 0 && (
              <Table.Tr>
                <Table.Td colSpan={5} className="py-2 text-center">
                  Tidak ada mutasi
                </Table.Td>
              </Table.Tr>
            )}
            {data.items.map((v) => (
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
    </main>
  );
};
