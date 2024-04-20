import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

export const useCheckVailableIdMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (userId) => {
      const result = await axios.get<BaseResponse<boolean>>(
        `/api/auth/v1/validation/user-id?userId=${userId}`
      );
      return result.data;
    },
  });
};
