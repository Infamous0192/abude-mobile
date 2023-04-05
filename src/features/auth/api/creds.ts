import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import storage from '@/utils/storage';

import { Creds } from '../types';

export const CREDS_KEY = 'creds';

export type CredsResponse = {
  creds: Creds;
};

export async function getCreds() {
  const res = await axios.get<CredsResponse>('/auth/me');

  return res.data;
}

export async function loadCreds() {
  if (!storage.getToken()) return null;

  const data = await getCreds();
  return data;
}

export function useCreds() {
  return useQuery([CREDS_KEY], loadCreds, {
    onError: () => {
      storage.clearToken();
    },
  });
}
