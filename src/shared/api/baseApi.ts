import axios, { type CreateAxiosDefaults } from 'axios';

import { auth } from '@/entities/auth';

const BASE_SERVER_URL =
  process.env.NEXT_PUBLIC_AUTH_URL ?? 'https://api.to-be-healthy.site';

const apiClient = () => {
  const defaultOptions: CreateAxiosDefaults = {
    baseURL: BASE_SERVER_URL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (request) => {
      const { tokens } = auth();
      if (tokens) {
        request.headers.Authorization = `Bearer ${tokens.accessToken}`;
        request.headers['Content-Type'] = 'application/json';
      }
      return request;
    },
    async (error) => {
      return await Promise.reject(error);
    }
  );

  return instance;
};

export const api = apiClient();
