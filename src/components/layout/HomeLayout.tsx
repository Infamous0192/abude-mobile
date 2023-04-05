import { IconClock, IconFileInvoice, IconHome, IconUser } from '@tabler/icons';
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
          { title: 'Riwayat', href: '/history', icon: IconClock },
          { title: 'Order', href: '/sales', icon: IconFileInvoice },
          { title: 'Profile', href: '/profile', icon: IconUser },
        ]}
      />
    </Suspense>
  );
};
