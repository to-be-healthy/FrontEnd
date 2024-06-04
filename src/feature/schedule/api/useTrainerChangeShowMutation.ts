import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

/**
 *
 * @description 노쇼 취소하기
 */
export const useTrainerChangeShowMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/schedule/v1/no-show/${scheduleId}`
      );
      return result.data;
    },
  });
};
