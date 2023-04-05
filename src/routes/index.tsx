import { Route, Routes } from 'react-router-dom';

import { HomeLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Sales } = lazyImport(() => import('@/features/transaction'), 'Sales');
const { Purchases } = lazyImport(() => import('@/features/transaction'), 'Purchases');

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="sales" element={<Sales />} />
        <Route path="purchases" element={<Purchases />} />
      </Route>
    </Routes>
  );
};
