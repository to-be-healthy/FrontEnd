import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { googleRedirectUri, kakaoRedirectUri } from '@/entity/auth';
import {
  CheckVerificationCodeRequest,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  SocialSignInRequest,
} from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

const useSignIn = () => {
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

const useSocialSignIn = () => {
  return useMutation<BaseResponse<SignInResponse>, BaseError, SocialSignInRequest>({
    mutationFn: async ({ provider, ...payload }) => {
      if (provider === 'kakao') {
        Object.assign(payload, { redirectUrl: kakaoRedirectUri });
      }
      if (provider === 'google') {
        Object.assign(payload, { redirectUrl: googleRedirectUri });
      }
      const result = await axios.post<BaseResponse<SignInResponse>>(
        `/api/auth/v1/access-token/${provider}`,
        payload
      );
      return result.data;
    },
  });
};

const useCheckVailableId = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (userId) => {
      const result = await axios.get<BaseResponse<boolean>>(
        `/api/auth/v1/validation/user-id?userId=${userId}`
      );
      return result.data;
    },
  });
};

const useSendVerificationCode = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (email) => {
      const result = await axios.post<BaseResponse<string>>(
        `/api/auth/v1/validation/send-email?email=${email}`
      );
      return result.data;
    },
  });
};

const useCheckVerificationCode = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CheckVerificationCodeRequest>({
    mutationFn: async (params) => {
      const result = await axios.post<BaseResponse<boolean>>(
        `/api/auth/v1/validation/confirm-email?email=${params.email}&&emailKey=${params.emailKey}`
      );
      return result.data;
    },
  });
};

const useSignUp = () => {
  return useMutation<BaseResponse<SignUpResponse>, BaseError, SignUpRequest>({
    mutationFn: async (params) => {
      const result = await axios.post<BaseResponse<SignUpResponse>>(
        `/api/auth/v1/join`,
        params
      );
      return result.data;
    },
  });
};

export {
  useCheckVailableId,
  useCheckVerificationCode,
  useSendVerificationCode,
  useSignIn,
  useSignUp,
  useSocialSignIn,
};
