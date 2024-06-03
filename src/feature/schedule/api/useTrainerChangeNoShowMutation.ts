import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

/**
 *
 * @description 노쇼 처리하기
 */
export const useTrainerChangeNoShowMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/schedule/v1/no-show/${scheduleId}`
      );
      return result.data;
    },
  });
};
