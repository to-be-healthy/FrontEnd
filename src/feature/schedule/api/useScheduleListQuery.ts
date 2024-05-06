import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { AllScheduleData } from '../model/type';

interface ScheduleResponse {
  morning: AllScheduleData[];
  afternoon: AllScheduleData[];
}

export const useScheduleListQuery = (lessonStartDt: string) => {
  return useQuery<ScheduleResponse, BaseError>({
    queryKey: ['scheduleList', lessonStartDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<ScheduleResponse>>(
        `/api/schedule/v1/student/all?lessonStartDt=${lessonStartDt}&lessonEndDt=${lessonStartDt}`
      );
      return res.data.data;
    },
  });
};
