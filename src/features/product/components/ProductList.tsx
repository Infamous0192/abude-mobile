import { IconArrowBarToDown, IconArrowBarUp, IconChevronRight } from '@tabler/icons';

import { clsx, formatCurrency } from '@/utils/format';

import { Product, Supplier } from '../types';

const supplier: Supplier = {
  id: 1,
  name: 'PT. Ujang Merdeka',
};

const products: Product[] = [
  {
    id: 1,
    name: 'Cincau',
    category: 'penjualan',
    price: 15000,
    unit: 'Cup',
  },
  {
    id: 2,
    name: 'Gelas',
    category: 'pembelian',
    price: 100,
    unit: 'Cup',
    supplier: supplier,
  },
  {
    id: 3,
    name: 'Pentol',
    category: 'penjualan',
    price: 15000,
    unit: 'Tusuk',
  },
];

const ProductItem: React.FC<Product> = (product) => {
  return (
    <div className="py-3 active:bg-gray-100 transition rounded-lg px-5">
      <div className="w-full flex items-center">
        <div
          className={clsx(
            'rounded-lg p-2',
            product.category == 'penjualan'
              ? 'bg-blue-100 text-blue-600'
              : 'bg-orange-100 text-orange-600'
          )}
        >
          {product.category == 'penjualan' ? (
            <IconArrowBarUp className="w-6 h-6" />
          ) : (
            <IconArrowBarToDown className="w-6 h-6" />
          )}
        </div>
        <div className="flex-grow px-3">
          <div className="text-sx font-bold">{product.name}</div>
          <div className="text-xs text-gray-600">{product.supplier?.name}</div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="font-bold">{formatCurrency(product.price)}</div>
          <div className="text-xs text-gray-600">/ {product.unit}</div>
        </div>
        <div className="flex-shrink-0 pl-2">
          <IconChevronRight className="w-6 h-6 text-gray-600" stroke={1.3} />
        </div>
      </div>
    </div>
  );
};

export const ProductList: React.FC = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </div>
  );
};
