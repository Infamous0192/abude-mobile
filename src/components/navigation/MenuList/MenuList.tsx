import { useId } from '@mantine/hooks';
import { Link } from 'react-router-dom';

type Navigation = {
  title: string;
  href: string;
  icon: string;
};

export const MenuItem: React.FC<Navigation> = ({ title, href, icon }) => {
  return (
    <Link to={href}>
      <div className="cursor-pointer flex flex-col items-center justify-center">
        <img src={icon} alt="" width={30} />
        <h3 className="text-xs text-gray-700 font-semibold mt-2 text-center">{title}</h3>
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
    <div className="grid grid-cols-4 gap-6">
      {navigations.map((nav, i) => (
        <MenuItem key={`${id}_${i}`} {...nav} />
      ))}
    </div>
  );
};
