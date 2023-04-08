import { IconClock, IconFileInvoice, IconHome } from '@tabler/icons';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { BottomNav } from '../navigation';

export const HomeLayout: React.FC = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="mb-36">
        <Outlet />
      </div>
      <BottomNav
        navigations={[
          { title: 'Beranda', href: '/', icon: IconHome },
          { title: 'Order', href: '/sales', icon: IconFileInvoice },
          { title: 'Riwayat', href: '/history', icon: IconClock },
        ]}
      />
    </Suspense>
  );
};
