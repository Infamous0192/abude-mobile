import { Menu } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { useAuth } from '@/features/auth';

import { useOutletContext } from '../hooks';

export const OutletPick: React.FC = () => {
  const { logout } = useAuth();
  const { outlet, setOutlet, outlets } = useOutletContext();

  return (
    <Menu width={256} position="bottom-start">
      <Menu.Target>
        <button className="bg-blue-400 text-blue-50 px-2 py-1 rounded-full text-xs mb-3 inline-block">
          {outlet?.name}
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {outlets.map(({ id, name }) => (
          <Menu.Item
            key={id}
            color={outlet?.id == id ? 'blue' : ''}
            onClick={() => {
              setOutlet(id);
            }}
          >
            {name}
          </Menu.Item>
        ))}

        <Menu.Divider />
        <Menu.Item color="red" onClick={() => logout()} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
