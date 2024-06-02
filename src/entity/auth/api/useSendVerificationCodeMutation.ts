import { useMutation } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

export const useSendVerificationCodeMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (email) => {
      const result = await api.post<BaseResponse<string>>(
        '/api/auth/v1/validation/send-email',
        {
          email,
        }
      );
      return result.data;
    },
  });
};
