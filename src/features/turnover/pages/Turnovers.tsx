import { Button, SegmentedControl } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { IconArrowLeft, IconCalendar, IconCategory, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Authorization, useAuth } from '@/features/auth';
import { OutletSelect, useOutletContext } from '@/features/outlet';

import { HandoverProofForm, HandoverProofList, TurnoverForm, TurnoverList } from '../components';
import { TurnoverQuery } from '../types';

export const Turnovers: React.FC = () => {
  const { outlet } = useOutletContext();
  const { creds } = useAuth();
  const [tab, setTab] = useState('turnover');
  const navigate = useNavigate();
  const [params, setParams] = useState<TurnoverQuery>({
    outlet: outlet?.id,
    startDate: undefined,
    endDate: undefined,
  });

  function handleAdd() {
    if (!outlet) return;

    if (tab === 'turnover') {
      modals.open({
        title: 'Tambah Bukti',
        children: <TurnoverForm outlet={creds?.role == 'employee' ? outlet?.id : undefined} />,
        fullScreen: true,
      });
    } else if (tab === 'handover') {
      modals.open({
        title: 'Tambah Bukti',
        children: <HandoverProofForm outlet={creds?.role == 'employee' ? outlet?.id : undefined} />,
        fullScreen: true,
      });
    }
  }

  return (
    <main className="py-28 bg-gray-50">
      <header className="px-5 py-3.5 fixed max-w-md w-full bg-white text-black top-0 z-20">
        <div className="flex items-center space-x-4 text-center">
          <div className="min-w-[1.5rem] flex">
            <button
              onClick={() => navigate('/')}
              className="bg-transparent active:translate-y-0.5 transition-transform"
            >
              <IconArrowLeft size={24} />
            </button>
          </div>
          <div className="flex-grow">
            <h1 className="font-bold text-base">Bukti Transaksi</h1>
          </div>
          <div className="min-w-[1.5rem] flex"></div>
        </div>

        <div className="mt-3.5">
          <SegmentedControl
            color="blue"
            fullWidth
            value={tab}
            onChange={(v) => setTab(v)}
            data={[
              { label: 'Bukti Serah Terima', value: 'turnover' },
              { label: 'Bukti Setoran', value: 'handover' },
            ]}
          />
        </div>
      </header>
      <section className="space-y-2 mb-4 mt-2 px-5">
        <Authorization role={['superadmin', 'owner']}>
          <OutletSelect
            placeholder="Pilih Outlet"
            icon={<IconCategory size={14} />}
            value={params.outlet?.toString()}
            onChange={(v) => {
              if (v == null) return;

              setParams({
                ...params,
                outlet: v,
              });
            }}
          />
        </Authorization>
        <DatePickerInput
          type="range"
          valueFormat="D MMMM YYYY"
          placeholder="Rentang Tanggal"
          icon={<IconCalendar size={14} />}
          value={[params.startDate ?? null, params.endDate ?? null]}
          allowSingleDateInRange
          onChange={([startDate, endDate]) =>
            setParams({
              ...params,
              startDate: startDate ?? undefined,
              endDate: endDate ?? undefined,
            })
          }
        />
      </section>

      <section className="px-4">
        {tab === 'turnover' ? (
          <TurnoverList outlet={outlet?.id} {...params} />
        ) : (
          <HandoverProofList outlet={outlet?.id} {...params} />
        )}
      </section>

      <footer className="max-w-md w-full fixed bottom-0 bg-white p-4 shadow-lg shadow-gray-200 border-t border-gray-100">
        <Button onClick={handleAdd} leftIcon={<IconPlus size={16} />} fullWidth size="xs">
          Tambah
        </Button>
      </footer>
    </main>
  );
};
