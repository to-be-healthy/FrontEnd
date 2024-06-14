import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { FindIdRequest, FindIdResponse } from '../model/types';

export const useFindIdMutation = () => {
  return useMutation<BaseResponse<FindIdResponse>, BaseError, FindIdRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindIdResponse>>(
        '/api/auth/v1/find/user-id',
        payload
      );
      return result.data;
    },
  });
};
