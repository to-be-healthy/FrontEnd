import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useStudentWaitingScheduleMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/schedule/waiting/v1/${scheduleId}`
      );
      console.log(result);
      return result.data;
    },
  });
};
