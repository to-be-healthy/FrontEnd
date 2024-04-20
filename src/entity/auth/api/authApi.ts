import axios, { AxiosError } from 'axios';

import { baseApi, BaseResponse } from '@/shared/api';

import { auth, useAuthAction } from '../model/store';
import { UserInfo } from '../model/types';

baseApi.interceptors.request.use(
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

baseApi.interceptors.response.use(
  async (response) => {
    return await Promise.resolve(response);
  },
  async (error: AxiosError) => {
    const { tokens, userId } = auth();

    const status = error.response?.status;
    const originRequest = error.config;
    const refreshToken = tokens?.refreshToken;

    if (!originRequest || !refreshToken || !userId) {
      return await Promise.reject(error);
    }

    if (status === 401) {
      const { data } = await requestRefreshToken(userId, refreshToken);
      useAuthAction().setUserInfo(data);
    }
    return await Promise.reject(error);
  }
);

const requestRefreshToken = async (userId: string, refreshToken: string) => {
  const result = await axios.post<BaseResponse<UserInfo>>(
    `/api/auth/v1/refresh-token?userId=${userId}&refreshToken=${refreshToken}`
  );
  return result.data;
};

export const api = baseApi;
