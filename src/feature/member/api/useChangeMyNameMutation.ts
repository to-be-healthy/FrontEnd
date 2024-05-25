import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useChangeMyNameMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (name) => {
      const result = await authApi.patch<BaseResponse<string>>(
        `/api/members/v1/name?name=${name}`
      );
      return result.data;
    },
  });
};
