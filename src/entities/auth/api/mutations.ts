import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { kakaoRedirectUri } from '@/entities/auth';
import { SignInRequest, SignInResponse, SocialSignInRequest } from '@/entities/auth';
import { BaseError, BaseResponse } from '@/shared/api';

const useSignInMutation = () => {
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

const useSocialSignInMutation = () => {
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

export { useSignInMutation, useSocialSignInMutation };
