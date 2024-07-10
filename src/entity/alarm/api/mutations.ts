import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface AlarmResponse {
  notificationId: number;
  isRead: boolean;
}
export const useReadAlarmMutation = (notificationId: number) => {
  return useMutation<BaseResponse<AlarmResponse>, BaseError, number>({
    mutationFn: async () => {
      const result = await authApi.patch<BaseResponse<AlarmResponse>>(
        `/api/notification/v1/${notificationId}`
      );
      return result.data;
    },
  });
};
