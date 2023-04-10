import { Route, Routes } from 'react-router-dom';

import { HomeLayout, PlainLayout, AuthLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { Products } = lazyImport(() => import('@/features/product'), 'Products');
const { Sales } = lazyImport(() => import('@/features/transaction'), 'Sales');
const { Purchases } = lazyImport(() => import('@/features/transaction'), 'Purchases');
const { Transactions } = lazyImport(() => import('@/features/transaction'), 'Transactions');
const { TransactionDetail } = lazyImport(
  () => import('@/features/transaction'),
  'TransactionDetail'
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="transaction" element={<Transactions />} />
        <Route path="product" element={<Products />} />
      </Route>

      <Route path="/" element={<PlainLayout />}>
        <Route path="purchases" element={<Purchases />} />
        <Route path="sales" element={<Sales />} />
        <Route path="transaction/:id" element={<TransactionDetail />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
