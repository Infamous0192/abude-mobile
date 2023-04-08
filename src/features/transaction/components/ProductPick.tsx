import { Button } from '@mantine/core';
import { useState } from 'react';

import { Product } from '@/features/product';
import { clsx, formatCurrency } from '@/utils/format';

type ProductItemProps = {
  product: Product;
  selected: boolean;
  onSelect: () => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, selected, onSelect }) => {
  return (
    <div
      className={clsx(
        'border rounded-lg w-full px-5 py-3 mb-3 transition duration-200',
        selected ? 'bg-blue-50 border-blue-600' : 'bg-white border-gray-200'
      )}
      onClick={onSelect}
      aria-hidden="true"
    >
      <div className="flex w-full">
        <div className="flex-grow flex items-center">
          <div>
            <h4 className="text-base font-bold">{product.name}</h4>
            <div className="text-sm text-gray-600">{formatCurrency(product.price)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  products: Product[];
  onSubmit: (product: Product) => void;
};

export const ProductPick: React.FC<Props> = ({ products, onSubmit }) => {
  const [selected, setSelected] = useState<Product | null>(null);

  function handleSelect(product: Product) {
    return () => {
      setSelected(product);
    };
  }

  function handleSubmit() {
    if (selected) onSubmit(selected);
  }

  return (
    <div>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          selected={product.id == selected?.id}
          onSelect={handleSelect(product)}
        />
      ))}

      <div className="flex justify-end pt-2">
        <Button disabled={selected == null} px="xl" onClick={handleSubmit}>
          Pilih
        </Button>
      </div>
    </div>
  );
};
