import { useMutation } from '@tanstack/react-query';

import {
  FindIdRequest,
  FindIdResponse,
  FindPasswordRequest,
  FindPasswordResponse,
} from '@/feature/manage';
import { api, BaseError, BaseResponse } from '@/shared/api';

export const useFindIdMutation = () => {
  return useMutation<BaseResponse<FindIdResponse>, BaseError, FindIdRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindIdResponse>>(
        '/api/v1/auth/find/user-id',
        payload
      );
      return result.data;
    },
  });
};

export const useFindPasswordMutation = () => {
  return useMutation<BaseResponse<FindPasswordResponse>, BaseError, FindPasswordRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindPasswordResponse>>(
        '/api/v1/auth/find/password',
        payload
      );
      return result.data;
    },
  });
};
