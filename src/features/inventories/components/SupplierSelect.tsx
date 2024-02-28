import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useSuppliers } from '../api';
import { Supplier } from '../types';

type Props = {
  onChange?: (id: number | null) => void;
  onSelected?: (supplier: Supplier | null) => void;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const SupplierSelect: React.FC<Props> = ({ onChange, onSelected, ...props }) => {
  const { data, isLoading } = useSuppliers({ params: { limit: -1 } });

  const suppliers = useMemo(() => {
    if (!data) return [];

    return data.result.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));
  }, [data]);

  function handleChange(v: string | null) {
    if (onChange) onChange(v ? parseInt(v) : null);

    if (onSelected && v) {
      onSelected(data?.result.filter(({ id }) => id == parseInt(v!)).at(0) || null);
    }
  }

  return <Select {...props} data={suppliers} disabled={isLoading} onChange={handleChange} />;
};
