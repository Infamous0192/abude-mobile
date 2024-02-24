import { Badge } from '@mantine/core';

import { PurchaseStatus } from '../types';

type Props = {
  status: PurchaseStatus;
};

export const PurchaseStatusBadge: React.FC<Props> = ({ status }) => {
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
