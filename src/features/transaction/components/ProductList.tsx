import { Anchor } from '@mantine/core';

import { Product } from '@/features/product';

import { ProductItem } from './ProductItem';

const products: Product[] = [
  {
    id: 1,
    name: 'Cincau',
    price: 15000,
    unit: 'Satuan',
    default: false,
    supplier: {
      id: 1,
      name: 'Cincau',
    },
  },
  {
    id: 2,
    name: 'Cendol',
    price: 5000,
    unit: 'Satuan',
    default: false,
    supplier: {
      id: 1,
      name: 'Cincau',
    },
  },
  {
    id: 3,
    name: 'Es Campur',
    price: 10000,
    unit: 'Satuan',
    default: false,
    supplier: {
      id: 1,
      name: 'Cincau',
    },
  },
];

export const ProductList: React.FC = () => {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}

      <div className="flex justify-end">
        <Anchor>+ Tambah Item</Anchor>
      </div>
    </div>
  );
};
