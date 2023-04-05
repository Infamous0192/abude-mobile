import { ActionIcon, NumberInput } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons';

import { Product } from '@/features/product';
import { formatCurrency } from '@/utils/format';

export const ProductItem: React.FC<Product> = () => {
  return (
    <div className="bg-white border border-gray-100 shadow-md shadow-gray-50 rounded-lg w-full px-5 py-3 mb-3">
      <div className="flex w-full">
        <div className="flex-grow flex items-center">
          <div>
            <h4 className="text-base font-bold">Cincau</h4>
            <div className="text-sm text-gray-600">{formatCurrency(15000)}</div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-shrink-0">
          <ActionIcon size={20} variant="filled" color="blue" radius="100%">
            <IconPlus className="p-px" />
          </ActionIcon>
          <NumberInput
            hideControls
            max={10}
            min={0}
            step={2}
            variant="unstyled"
            defaultValue={1}
            className="[&_input]:w-8 [&_input]:text-center border-b border-gray-200 px-2"
          />
          <ActionIcon size={20} variant="filled" color="blue" radius="100%">
            <IconMinus className="p-px" />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};
