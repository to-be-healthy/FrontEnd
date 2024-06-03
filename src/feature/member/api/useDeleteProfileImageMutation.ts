import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDeleteProfileImageMutation = () => {
  return useMutation<BaseResponse<undefined>, BaseError>({
    mutationFn: async () => {
      const result = await authApi.delete<BaseResponse<undefined>>(
        `/api/members/v1/profile`
      );
      return result.data;
    },
  });
};
