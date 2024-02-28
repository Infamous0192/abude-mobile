import { NumberInput, TextInput } from '@mantine/core';
import { useState } from 'react';

import { Product } from '@/features/inventories';

import { PurchaseDTO } from '../types';

type ItemValue = { price: number; quantity: number };

type ItemProps = {
  product: Product;
  onChange: (amount: ItemValue) => void;
};

const PurchaseItem: React.FC<ItemProps> = ({ product, onChange }) => {
  const [value, setValue] = useState<ItemValue>({ quantity: 1, price: product.price });

  function handlePrice(price: number | string) {
    setValue({ ...value, price: Number(price) });
    onChange({ ...value, price: Number(price) });
  }

  function handleQuantity(quantity: number | string) {
    setValue({ ...value, quantity: Number(quantity) });
    onChange({ ...value, quantity: Number(quantity) });
  }

  function handleRemove() {
    setValue({ ...value, quantity: 0 });
    onChange({ ...value, quantity: 0 });
  }

  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-2 pt-3">
      <div className="col-span-12">
        <TextInput
          label="Nama Barang"
          value={product.name}
          readOnly
          rightSection={
            <button className="text-red-600 text-xs bg-transparent pr-4" onClick={handleRemove}>
              Hapus
            </button>
          }
        />
      </div>
      <div className="col-span-6">
        <NumberInput
          label="Harga"
          hideControls
          value={value.price}
          onChange={handlePrice}
          rightSectionWidth={24}
          rightSection={<span className="text-xs text-gray-600">/{product.unit}</span>}
          thousandSeparator="."
          decimalSeparator=","
        />
      </div>
      <div className="col-span-6">
        <NumberInput
          label="Jumlah"
          value={value.quantity}
          onChange={handleQuantity}
          thousandSeparator="."
          decimalSeparator=","
        />
      </div>
    </div>
  );
};

type Props = {
  products: Product[];
  items: PurchaseDTO['items'];
  onChange: (item: PurchaseDTO['items']) => void;
};

export const PurchaseItemList: React.FC<Props> = ({ products, items, onChange }) => {
  function handleChange(product: Product) {
    return ({ price, quantity }: ItemValue) => {
      if (quantity <= 0) {
        return onChange(items.filter((item) => item.product != product.id));
      }

      onChange(
        items.map((item) => {
          if (item.product == product.id) {
            return { ...item, price, quantity };
          }

          return item;
        })
      );
    };
  }

  return (
    <div className="divide-y space-y-4 divide-gray-300">
      {products
        .filter((product) => {
          return items.filter((item) => item.product == product.id).length > 0;
        })
        .map((product) => (
          <PurchaseItem key={product.id} product={product} onChange={handleChange(product)} />
        ))}
    </div>
  );
};
