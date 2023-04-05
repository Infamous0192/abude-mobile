import { useId } from '@mantine/hooks';
import { Link } from 'react-router-dom';

export type Navigation = {
  title: string;
  href: string;
  icon: string;
};

export const MenuItem: React.FC<Navigation> = ({ title, href, icon }) => {
  return (
    <Link to={href}>
      <div className="cursor-pointer border border-gray-50 shadow-lg shadow-gray-100 bg-white hover:bg-blue-50 hover:border-blue-300 transition rounded-lg flex flex-col items-center justify-center aspect-square">
        <img src={icon} alt="" width={60} />
        <h3 className="text-base text-gray-800 font-bold mt-2">{title}</h3>
      </div>
    </Link>
  );
};

type Props = {
  navigations: Navigation[];
};

export const MenuList: React.FC<Props> = ({ navigations }) => {
  const id = useId();

  return (
    <div className="grid grid-cols-2 gap-6">
      {navigations.map((nav, i) => (
        <MenuItem key={`${id}_${i}`} {...nav} />
      ))}
    </div>
  );
};
