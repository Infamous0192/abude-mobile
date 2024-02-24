import { Button, SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconArrowLeft, IconCalendar, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useOutletContext } from '@/features/outlet';

import { ExpenseList, WageList } from '../components';

export const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const { outlet } = useOutletContext();
  const [selected, setSelected] = useState<string>('general');
  const [date, setDate] = useState<[Date | null, Date | null]>([null, null]);

  function handleBack() {
    if (window.history.length <= 1) {
      return navigate('/');
    }

    return navigate(-1);
  }

  return (
    <main className="py-28">
      <header className="px-5 py-3.5 fixed max-w-md w-full bg-white text-black top-0 z-20">
        <div className="flex items-center space-x-4 text-center">
          <div className="min-w-[1.5rem] flex">
            <button
              onClick={handleBack}
              className="bg-transparent active:translate-y-0.5 transition-transform"
            >
              <IconArrowLeft size={24} />
            </button>
          </div>
          <div className="flex-grow">
            <h1 className="font-bold text-base">Pengeluaran</h1>
          </div>
          <div className="min-w-[1.5rem] flex"></div>
        </div>

        <div className="mt-3.5">
          <SegmentedControl
            color="blue"
            fullWidth
            value={selected}
            onChange={(v) => {
              setSelected(v);
            }}
            data={[
              { label: 'Umum', value: 'general' },
              { label: 'Kasbon', value: 'wage' },
            ]}
          />
        </div>
      </header>

      <div className="px-5 my-2">
        <DatePickerInput
          type="range"
          placeholder="Rentang Tanggal"
          leftSection={<IconCalendar size={16} />}
          value={[date[0] || null, date[1] || null]}
          onChange={(v) => {
            setDate(v);
          }}
        />
      </div>

      {selected == 'general' ? (
        <ExpenseList
          outlet={outlet?.id}
          limit={20}
          startDate={date[0] || undefined}
          endDate={date[1] || undefined}
        />
      ) : (
        <WageList
          outlet={outlet?.id}
          limit={20}
          startDate={date[0] || undefined}
          endDate={date[1] || undefined}
        />
      )}

      <div className="max-w-md bottom-0 fixed bg-white py-4 w-full border-t border-gray-200 px-5">
        {selected == 'general' ? (
          <Button leftSection={<IconPlus size={20} />} fullWidth component={Link} to="/expense/add">
            Tambah Pengeluaran
          </Button>
        ) : (
          <Button leftSection={<IconPlus size={20} />} fullWidth component={Link} to="/wage/add">
            Tambah Kasbon
          </Button>
        )}
      </div>
    </main>
  );
};
