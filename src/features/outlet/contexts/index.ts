import { createContext } from 'react';

import { Outlet } from '../types';

export type OutletContextValue = {
  outlet: Outlet | null;
  setOutlet: (id: number) => void;
  outlets: Outlet[];
};

export const OutletContext = createContext<OutletContextValue>({} as OutletContextValue);
