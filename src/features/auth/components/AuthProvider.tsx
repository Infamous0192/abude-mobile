import { Center, Loader } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { useEmployee } from '@/features/employee';

import { logout, useCreds } from '../api';
import { AuthContext } from '../contexts';

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const credsQuery = useCreds();
  const employeeQuery = useEmployee({ config: { enabled: false } });

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      creds: credsQuery.data ?? null,
      employee: employeeQuery.data ?? null,
      logout: logoutMutation.mutateAsync,
    }),
    [credsQuery, employeeQuery, logoutMutation.mutateAsync]
  );

  if (credsQuery.isLoading || employeeQuery.isFetching || logoutMutation.isLoading)
    return (
      <Center className="w-full h-screen bg-body">
        <Loader />
      </Center>
    );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
