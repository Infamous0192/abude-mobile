import { Route, Routes } from 'react-router-dom';

import { HomeLayout, AuthLayout, AppLayout, PlainLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Development } = lazyImport(() => import('@/features/misc'), 'Development');
const { Home } = lazyImport(() => import('@/features/misc'), 'Home');
const { DataMaster } = lazyImport(() => import('@/features/misc'), 'DataMaster');
const { DataPengeluaran } = lazyImport(() => import('@/features/misc'), 'DataPengeluaran');
const { Profile } = lazyImport(() => import('@/features/employee'), 'Profile');
const { Products } = lazyImport(() => import('@/features/product'), 'Products');
const { Suppliers } = lazyImport(() => import('@/features/product'), 'Suppliers');
const { Attendances } = lazyImport(() => import('@/features/employee'), 'Attendances');
const { Outlets } = lazyImport(() => import('@/features/outlet'), 'Outlets');

const { Handovers } = lazyImport(() => import('@/features/handover'), 'Handovers');
const { HandoverCreate } = lazyImport(() => import('@/features/handover'), 'HandoverCreate');

const { Turnovers } = lazyImport(() => import('@/features/turnover'), 'Turnovers');

const { Transactions } = lazyImport(() => import('@/features/transaction'), 'Transactions');
const { SaleCreate } = lazyImport(() => import('@/features/transaction'), 'SaleCreate');
const { SaleDetail } = lazyImport(() => import('@/features/transaction'), 'SaleDetail');
const { PurchaseCreate } = lazyImport(() => import('@/features/transaction'), 'PurchaseCreate');
const { PurchaseDetail } = lazyImport(() => import('@/features/transaction'), 'PurchaseDetail');
const { Expenses } = lazyImport(() => import('@/features/transaction'), 'Expenses');
const { ExpenseCreate } = lazyImport(() => import('@/features/transaction'), 'ExpenseCreate');
const { ExpenseDetail } = lazyImport(() => import('@/features/transaction'), 'ExpenseDetail');
const { PurchaseRecapitulation } = lazyImport(
  () => import('@/features/transaction'),
  'PurchaseRecapitulation'
);
const { TransactionSummary } = lazyImport(
  () => import('@/features/transaction'),
  'TransactionSummary'
);

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="transaction" element={<Transactions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="data-master" element={<DataMaster />} />
          <Route path="pengeluaran" element={<DataPengeluaran />} />
        </Route>

        <Route path="transaction/summary" element={<TransactionSummary />} />
        <Route path="purchase/summary" element={<PurchaseRecapitulation />} />

        <Route path="sale/:id" element={<SaleDetail />} />
        <Route path="sale/add" element={<SaleCreate />} />

        <Route path="purchase/:id" element={<PurchaseDetail />} />
        <Route path="purchase/add" element={<PurchaseCreate />} />

        <Route path="expense" element={<Expenses />} />
        <Route path="purchase/:id" element={<ExpenseDetail />} />
        <Route path="expense/add" element={<ExpenseCreate />} />

        <Route path="handover" element={<Handovers />} />
        <Route path="handover/create" element={<HandoverCreate />} />

        <Route path="turnover" element={<Turnovers />} />

        <Route path="attendance" element={<Attendances />} />
        <Route path="product" element={<Products />} />
        <Route path="supplier" element={<Suppliers />} />

        <Route path="development" element={<Development />} />
      </Route>

      <Route path="/" element={<PlainLayout />}>
        <Route path="outlet" element={<Outlets />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
