import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useLogOutMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, undefined>({
    mutationFn: async () => {
      const result = await authApi.post<BaseResponse<boolean>>(`/api/members/v1/logout`);
      return result.data;
    },
  });
};
