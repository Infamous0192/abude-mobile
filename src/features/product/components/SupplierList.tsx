import { IconChevronRight } from '@tabler/icons';

import { Supplier } from '../types';

const suppliers: Supplier[] = [
  {
    id: 1,
    name: 'PT Ujang Merdeka',
  },
  {
    id: 2,
    name: 'CV Arba Laundry',
  },
];

export const SupplierList: React.FC = () => {
  return (
    <div>
      {suppliers.map((supplier) => (
        <div
          key={supplier.id}
          className="flex items-center justify-between py-4 border-b border-gray-300 active:bg-gray-100 transition px-5"
        >
          <div className="font-semibold">{supplier.name}</div>
          <div>
            <IconChevronRight className="w-6 h-6 text-gray-600" stroke={1.3} />
          </div>
        </div>
      ))}
    </div>
  );
};
