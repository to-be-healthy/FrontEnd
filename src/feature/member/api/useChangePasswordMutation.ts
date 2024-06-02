import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ChangePasswordRequest {
  changePassword1: string;
  changePassword2: string;
}

export const useChangePasswordMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ChangePasswordRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        '/api/members/v1/password',
        payload
      );
      return result.data;
    },
  });
};
