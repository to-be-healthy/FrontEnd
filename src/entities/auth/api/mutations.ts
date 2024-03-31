import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { googleRedirectUri, kakaoRedirectUri } from '@/entities/auth';
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
      // TODO) 서버측에서 요청받은 클라이언트의 host를 판별하여 redirectUri를 확인하도록 협의 필요
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

export { useSignInMutation, useSocialSignInMutation };
