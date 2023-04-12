import { UnstyledButton } from '@mantine/core';
import { IconChevronRight, IconLogout, IconSettings, IconUser } from '@tabler/icons';

export const Profile: React.FC = () => {
  return (
    <main className="py-12">
      <section className="flex flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-900 rounded-full p-7 mb-4">
          <IconUser className="w-16 h-16" />
        </div>
        <div className="font-bold text-lg">Dwa Meizadewa</div>
        <div className="text-sm text-gray-600">Admin Outlet</div>
      </section>

      <section className="w-full mt-8 px-5">
        <UnstyledButton className="flex w-full items-center py-2">
          <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
            <IconSettings className="w-6 h-6" />
          </div>
          <div className="font-bold px-4 flex-grow">Settings</div>
          <div className="rounded-lg">
            <IconChevronRight className="w-6 h-6" />
          </div>
        </UnstyledButton>
        <UnstyledButton className="flex w-full items-center py-2">
          <div className="bg-red-50 text-red-600 rounded-lg p-2">
            <IconLogout className="w-6 h-6" />
          </div>
          <div className="font-bold px-4 flex-grow">Logout</div>
          <div className="rounded-lg">
            <IconChevronRight className="w-6 h-6" />
          </div>
        </UnstyledButton>
      </section>
    </main>
  );
};
