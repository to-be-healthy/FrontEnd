import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { FindPasswordRequest, FindPasswordResponse } from '../model/types';

export const useFindPasswordMutation = () => {
  return useMutation<BaseResponse<FindPasswordResponse>, BaseError, FindPasswordRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindPasswordResponse>>(
        '/api/auth/v1/find/password',
        payload
      );
      return result.data;
    },
  });
};
