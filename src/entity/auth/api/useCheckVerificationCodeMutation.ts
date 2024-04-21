import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

interface CheckVerificationCodeRequest {
  email: string;
  emailKey: string;
}

export const useCheckVerificationCodeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CheckVerificationCodeRequest>({
    mutationFn: async (params) => {
      const result = await api.post<BaseResponse<boolean>>(
        `/api/auth/v1/validation/confirm-email?email=${params.email}&&emailKey=${params.emailKey}`
      );
      return result.data;
    },
  });
};
