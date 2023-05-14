import { Select, SelectProps } from '@mantine/core';

import { useShifts } from '@/features/employee';
import { useOutletContext } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';

type Props = Omit<SelectProps, 'data'>;

export const ShiftPick: React.FC<Props> = (props) => {
  const { outlet } = useOutletContext();
  const { data } = useShifts({ params: { limit: -1, company: outlet?.company.id } });

  return (
    <Select
      {...props}
      data={[
        ...(data?.result ?? []).map(({ id, name, startTime, endTime }) => ({
          value: id.toString(),
          label: `${name} (${dayjs(startTime, 'HH:mm:ss').format('HH.mm')} - ${dayjs(
            endTime,
            'HH:mm:ss'
          ).format('HH.mm')})`,
        })),
      ]}
    />
  );
};
