import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { googleRedirectUri, kakaoRedirectUri } from '../consts';
import { SignUpRequest, SocialProvider, UserInfo } from '../model/types';
import { authApi } from './authApi';

export const useCheckVailableIdMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (userId) => {
      const result = await api.get<BaseResponse<boolean>>(
        `/api/auth/v1/validation/user-id?userId=${userId}`
      );
      return result.data;
    },
  });
};

interface CheckVerificationCodeRequest {
  email: string;
  emailKey: string;
}

export const useCheckVerificationCodeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CheckVerificationCodeRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<boolean>>(
        `/api/auth/v1/validation/confirm-email`,
        payload
      );
      return result.data;
    },
  });
};

export const useDeleteAccountMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, undefined>({
    mutationFn: async () => {
      const result = await authApi.post<BaseResponse<boolean>>(`/api/members/v1/delete`);
      return result.data;
    },
  });
};

export const useSendVerificationCodeMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (email) => {
      const result = await api.post<BaseResponse<string>>(
        '/api/auth/v1/validation/send-email',
        {
          email,
        }
      );
      return result.data;
    },
  });
};

interface SignInRequest {
  userId: string;
  password: string;
  memberType: string;
}

export const useSignInMutation = () => {
  return useMutation<BaseResponse<UserInfo>, BaseError, SignInRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<UserInfo>>(
        '/api/auth/v1/login',
        payload
      );
      return result.data;
    },
  });
};

interface SignUpResponse {
  id: number;
  email: string;
  userId: string;
  name: string;
  memberType: string;
}

export const useSignUpMutation = () => {
  return useMutation<BaseResponse<SignUpResponse>, BaseError, SignUpRequest>({
    mutationFn: async (params) => {
      const result = await api.post<BaseResponse<SignUpResponse>>(
        `/api/auth/v1/join`,
        params
      );
      return result.data;
    },
  });
};

interface SocialSignInRequest {
  provider: SocialProvider;
  code: string;
  memberType: string;
  state: string;
  redirectUrl?: string;
}

export const useSocialSignInMutation = () => {
  return useMutation<BaseResponse<UserInfo>, BaseError, SocialSignInRequest>({
    mutationFn: async ({ provider, ...payload }) => {
      if (provider === 'kakao') {
        Object.assign(payload, { redirectUrl: kakaoRedirectUri });
      }
      if (provider === 'google') {
        Object.assign(payload, { redirectUrl: googleRedirectUri });
      }
      const result = await api.post<BaseResponse<UserInfo>>(
        `/api/auth/v1/access-token/${provider}`,
        payload
      );
      return result.data;
    },
  });
};
