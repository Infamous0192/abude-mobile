import { Badge } from '@mantine/core';

import { Sale } from '../types';

type Props = {
  status: Sale['status'];
};

export const SaleStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'approved':
      return (
        <Badge color="orange" variant="light" radius="xs">
          Direkap
        </Badge>
      );
    case 'accepted':
      return (
        <Badge color="green" variant="light" radius="xs">
          Diterima
        </Badge>
      );
    case 'canceled':
      return (
        <Badge color="red" variant="light" radius="xs">
          Batal
        </Badge>
      );
    default:
      return null;
  }
};
