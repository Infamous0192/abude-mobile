import { createContext } from 'react';

import { Creds } from '../types';

export interface AuthContextValue<Error = unknown> {
  creds: Creds | undefined;
  isLoading: boolean;
  logout: () => void;
  error: Error | null;
}

export const AuthContext = createContext<AuthContextValue>({
  logout: () => {},
  error: null,
  creds: undefined,
  isLoading: true,
});
