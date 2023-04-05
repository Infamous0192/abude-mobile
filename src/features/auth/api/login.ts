import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import storage from '@/utils/storage';

import { Creds } from '../types';

import { CREDS_KEY } from './creds';

type LoginDTO = {
  data: {
    username: string;
    password: string;
  };
};

type LoginResponse = {
  message: string;
  token: string;
  creds: Creds;
};

export async function login({ data }: LoginDTO) {
  const res = await axios.post<LoginResponse>('/auth/login', data);

  return res.data;
}

type UseLoginOption = {
  config?: MutationConfig<typeof login>;
};

export function useLogin({ config }: UseLoginOption = {}) {
  return useMutation(login, {
    onSuccess: ({ creds, token }) => {
      queryClient.setQueryData([CREDS_KEY], { creds });
      storage.setToken(token);
    },
    ...config,
  });
}
