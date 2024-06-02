import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useVerifyPasswordMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (password) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        '/api/members/v1/password',
        {
          password,
        }
      );
      return result.data;
    },
  });
};
