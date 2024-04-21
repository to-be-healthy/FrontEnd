import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { UserInfo } from '../model/types';

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
