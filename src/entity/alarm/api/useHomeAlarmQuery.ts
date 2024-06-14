import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

export const useHomeAlarmQuery = () => {
  return useQuery<boolean, BaseError>({
    queryKey: ['HomeAlarm'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<boolean>>(
        `/api/notification/v1/red-dot`
      );
      return res.data.data;
    },
  });
};
