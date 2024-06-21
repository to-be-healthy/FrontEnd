import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface TokenResponse {
  name: string;
  token: string;
}

export const useRegisterTokenMutation = () => {
  return useMutation<BaseResponse<TokenResponse>, BaseError, string>({
    mutationFn: async (token: string) => {
      const result = await authApi.post<BaseResponse<TokenResponse>>(`/api/push/v1`, {
        token,
      });
      return result.data;
    },
  });
};
