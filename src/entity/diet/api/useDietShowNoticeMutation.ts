import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useDietShowNoticeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (alarmStatus: string) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/members/v1/diet-notice?alarmStatus=${alarmStatus}`
      );
      return result.data;
    },
  });
};
