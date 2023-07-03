import { Badge } from '@mantine/core';

import { Purchase } from '../types';

type Props = {
  status: Purchase['status'];
};

export const PurchaseStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'success':
      return (
        <Badge color="green" radius="xs">
          Berhasil
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
