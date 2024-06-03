import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

/**
 *
 * @description 등록된 학생의 수업 취소
 */
export const useTrainerCancelReservationMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/schedule/v1/trainer/${scheduleId}`
      );
      return result.data;
    },
  });
};
