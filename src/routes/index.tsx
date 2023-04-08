import { Route, Routes } from 'react-router-dom';

import { HomeLayout, PlainLayout, AuthLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Sales } = lazyImport(() => import('@/features/transaction'), 'Sales');
const { Purchases } = lazyImport(() => import('@/features/transaction'), 'Purchases');

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/" element={<PlainLayout />}>
        <Route path="purchases" element={<Purchases />} />
        <Route path="sales" element={<Sales />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
