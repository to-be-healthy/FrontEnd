import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

import { kakaoRedirectUri } from '.';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SocialSignInRequest,
} from './model';

export const useSignInMutation = () => {
  return useMutation<BaseResponse<SignInResponse>, BaseError, SignInRequest>({
    mutationFn: async (payload) => {
      const result = await axios.post<BaseResponse<SignInResponse>>(
        '/api/auth/v1/login',
        payload
      );
      return result.data;
    },
  });
};

export const useSocialSignInMutation = () => {
  return useMutation<BaseResponse<SignInResponse>, BaseError, SocialSignInRequest>({
    mutationFn: async ({ provider, ...payload }) => {
      if (provider === 'kakao') {
        Object.assign(payload, { redirectUrl: kakaoRedirectUri });
      }
      const result = await axios.post<BaseResponse<SignInResponse>>(
        `/api/auth/v1/access-token/${provider}`,
        payload
      );
      return result.data;
    },
  });
};

export const checkVailableId = async (userId: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.get(
    `/api/auth/v1/validation/user-id?userId=${userId}`
  );
  return result.data;
};

export const sendEmailVerificationCode = async (email: string) => {
  const result: AxiosResponse<BaseResponse<string>> = await axios.post(
    `/api/auth/v1/validation/send-email?email=${email}`
  );
  return result.data;
};

export const checkVerificationCode = async (email: string, emailKey: string) => {
  const result: AxiosResponse<BaseResponse<boolean>> = await axios.post(
    `/api/auth/v1/validation/confirm-email?email=${email}&&emailKey=${emailKey}`
  );
  return result.data;
};

export const requestSignUp = async (params: SignUpRequest) => {
  const result: AxiosResponse<BaseResponse<SignUpResponse>> = await axios.post(
    `/api/auth/v1/join`,
    params
  );
  return result.data;
};
