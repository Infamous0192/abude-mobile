import { Badge } from '@mantine/core';

import { Sale } from '../types';

type Props = {
  status: Sale['status'];
};

export const SaleStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'approved':
      return (
        <Badge color="green" radius="xs">
          Diterima
        </Badge>
      );
    case 'accepted':
      return (
        <Badge color="gray" radius="xs">
          Pending
        </Badge>
      );
    case 'canceled':
      return (
        <Badge color="red" radius="xs">
          Batal
        </Badge>
      );
    default:
      return null;
  }
};
