import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ChangeEmailRequest {
  email: string;
  emailKey: string;
}

export const useChangeEmailMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ChangeEmailRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        '/api/members/v1/email',
        payload
      );
      return result.data;
    },
  });
};
