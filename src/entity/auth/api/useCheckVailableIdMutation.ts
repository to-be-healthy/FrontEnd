import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

export const useCheckVailableIdMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (userId) => {
      const result = await api.get<BaseResponse<boolean>>(
        `/api/auth/v1/validation/user-id?userId=${userId}`
      );
      return result.data;
    },
  });
};
