import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface EnabledScheduleRequest {
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
}

export const useEnableScheduleMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EnabledScheduleRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/schedule/v1/individual`,
        payload
      );
      return result.data;
    },
  });
};
