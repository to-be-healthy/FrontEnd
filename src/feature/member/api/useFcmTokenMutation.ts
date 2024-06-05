import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useFcmTokenMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (token) => {
      const result = await authApi.post<BaseResponse<string>>('/api/push/register', {
        token,
      });
      return result.data;
    },
  });
};
