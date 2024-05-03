import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ScheduleData {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  reservationStatus: string;
  round: number;
  trainerName: string;
  applicantName: null | string;
  standByName: null | string;
}
interface ScheduleResponse {
  morning: ScheduleData[];
  afternoon: ScheduleData[];
}

export const useScheduleListQuery = (lessonStartDt: string) => {
  return useQuery<ScheduleResponse, BaseError>({
    queryKey: ['scheduleList', lessonStartDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<ScheduleResponse>>(
        `/api/schedule/v1/trainer/all?lessonStartDt=${lessonStartDt}&lessonEndDt=${lessonStartDt}`
      );
      return res.data.data;
    },
  });
};
