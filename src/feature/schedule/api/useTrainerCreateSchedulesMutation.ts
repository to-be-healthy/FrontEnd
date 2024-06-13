import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateWeeklySchedulesRequest {
  lessonStartDt: string;
  lessonEndDt: string;
}

export const useTrainerCreateSchedulesMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateWeeklySchedulesRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        '/api/schedule/v1',
        payload
      );
      return result.data;
    },
  });
};
