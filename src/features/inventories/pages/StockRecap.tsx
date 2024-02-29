import { Button, Table, TextInput, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/navigation';
import { formatCurrency } from '@/utils/format';

export const StockRecap: React.FC = () => {
  return (
    <main className="pt-14">
      <Navbar title="Tambah Rekapitulasi" position="center" />

      <div className="bg-white px-5 py-4 my-1">
        <div className="space-y-2">
          <DateInput
            label="Tanggal"
            placeholder="Masukan Tanggal"
            readOnly
            defaultValue={new Date()}
            variant="filled"
            valueFormat="D MMMM YYYY"
          />
          <TextInput label="Penanggung Jawab" placeholder="Masukan Penanggung Jawab" />
          <Textarea label="Catatan" placeholder="Masukan Catatan" />
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
            <Table.Tr>
              <Table.Td className="whitespace-nowrap">Teh Celup</Table.Td>
              <Table.Td>2</Table.Td>
              <Table.Td>4</Table.Td>
              <Table.Td>3</Table.Td>
              <Table.Td>3</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="whitespace-nowrap">Teh Celup</Table.Td>
              <Table.Td>2</Table.Td>
              <Table.Td>4</Table.Td>
              <Table.Td>3</Table.Td>
              <Table.Td>3</Table.Td>
            </Table.Tr>
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
            <Table.Tr>
              <Table.Td className="whitespace-nowrap">Teh Celup</Table.Td>
              <Table.Td>{formatCurrency(10000)}</Table.Td>
              <Table.Td>{formatCurrency(20000)}</Table.Td>
              <Table.Td>{formatCurrency(15000)}</Table.Td>
              <Table.Td>{formatCurrency(15000)}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td className="whitespace-nowrap">Teh Celup</Table.Td>
              <Table.Td>{formatCurrency(10000)}</Table.Td>
              <Table.Td>{formatCurrency(20000)}</Table.Td>
              <Table.Td>{formatCurrency(15000)}</Table.Td>
              <Table.Td>{formatCurrency(15000)}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>

      <footer className="max-w-md bottom-0 fixed bg-white py-4 w-full border-t border-gray-50 px-5">
        <div className="flex items-center justify-between">
          <Button fullWidth component={Link} to="/stock/summary">
            Konfirmasi
          </Button>
        </div>
      </footer>
    </main>
  );
};
