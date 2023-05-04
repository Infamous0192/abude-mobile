import { useState } from 'react';

import { LoadingScreen } from '@/components/elements';
import { useAuth } from '@/features/auth';
import { useEmployeeOutlet } from '@/features/employee';

import { OutletContext } from '../contexts';
import { Outlet } from '../types';

type Props = {
  children: React.ReactNode;
};

export const OutletProvider: React.FC<Props> = ({ children }) => {
  const [selected, setSelected] = useState<Outlet | null>(null);
  const { creds } = useAuth();
  const { data, isLoading } = useEmployeeOutlet({ config: { enabled: !!creds } });

  function setOutlet(id: number) {
    if (isLoading) return;

    const filteredOutlet = data?.result.filter((outlet) => outlet.id == id);

    if (filteredOutlet?.length == 0 || !filteredOutlet) {
      return setSelected(null);
    }

    setSelected(filteredOutlet[0]);
  }

  if (isLoading && creds != null) return <LoadingScreen />;

  return (
    <OutletContext.Provider value={{ outlet: selected, setOutlet, outlets: data?.result ?? [] }}>
      {children}
    </OutletContext.Provider>
  );
};
