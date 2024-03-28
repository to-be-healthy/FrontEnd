import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

import {
  Provider,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
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

// TODO) 소셜 로그인 진행 중
interface SocialSignInRequest {
  code: string;
  memberType: string;
}
// TODO) 소셜 로그인 진행 중
export const useSocialSignInMutation = (provider: Provider) => {
  console.log(provider);
  return useMutation<BaseResponse<SocialSignInRequest>, BaseError, SocialSignInRequest>({
    mutationFn: async (payload) => {
      const result = await axios.post<BaseResponse<SocialSignInRequest>>(
        '/api/auth/v1/access-token/google',
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
