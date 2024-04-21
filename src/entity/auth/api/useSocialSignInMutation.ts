import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { googleRedirectUri, kakaoRedirectUri } from '../consts';
import { SocialProvider, UserInfo } from '../model/types';

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
