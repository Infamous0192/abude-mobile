import { IconBoxSeam, IconClock, IconHome } from '@tabler/icons';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from '../elements';
import { BottomNav } from '../navigation';

export const HomeLayout: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
      <BottomNav
        navigations={[
          { title: 'Beranda', href: '/', icon: IconHome },
          { title: 'Barang', href: '/product', icon: IconBoxSeam },
          { title: 'Riwayat', href: '/transaction', icon: IconClock },
        ]}
      />
    </>
  );
};
