import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { BaseError, BaseResponse } from '@/shared/api';

export const useSendVerificationCodeMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (email) => {
      const result = await axios.post<BaseResponse<string>>(
        `/api/auth/v1/validation/send-email?email=${email}`
      );
      return result.data;
    },
  });
};
