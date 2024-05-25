import { useMutation } from '@tanstack/react-query';

import { BaseError, BaseResponse } from '@/shared/api';

import { authApi } from './authApi';

export const useDeleteAccountMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, undefined>({
    mutationFn: async () => {
      const result = await authApi.post<BaseResponse<boolean>>(`/api/members/v1/delete`);
      return result.data;
    },
  });
};
