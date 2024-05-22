import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useTrainerCancelReservationScheduleMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/schedule/v1/trainer/${scheduleId}`
      );
      return result.data;
    },
  });
};
