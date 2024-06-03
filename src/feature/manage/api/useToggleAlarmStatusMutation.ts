import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ToggleAlarmStatusRequest {
  type: 'PUSH' | 'COMMUNITY' | 'FEEDBACK' | 'SCHEDULENOTICE';
  status: 'ENABLED' | 'DISABLE';
}

export const useToggleAlarmStatusMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ToggleAlarmStatusRequest>({
    mutationFn: async ({ type, status }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/members/v1/alarm/${type}/${status}`
      );
      return result.data;
    },
  });
};
