import { Center, Loader } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { logout, useCreds } from '../api';
import { AuthContext } from '../contexts';

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const { data, error, status, isLoading, isSuccess } = useCreds();

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const value = useMemo(
    () => ({
      creds: data?.creds,
      error,
      isLoading,
      logout: logoutMutation.mutateAsync,
    }),
    [data, error, logoutMutation.mutateAsync, isLoading]
  );

  if (isLoading || logoutMutation.isLoading)
    return (
      <Center className="w-full h-screen bg-body">
        <Loader />
      </Center>
    );

  if (isSuccess) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  return <div>Unhandled status: {status}</div>;
};
