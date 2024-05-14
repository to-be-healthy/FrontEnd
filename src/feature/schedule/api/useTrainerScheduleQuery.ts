import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { TrainerWeeklySchedule } from '../model/type';

interface TrainerScheduleRequest {
  lessonDt?: string;
  lessonStartDt?: string;
  lessonEndDt?: string;
}

interface TrainerScheduleResponse {
  trainerName: string;
  schedule: TrainerWeeklySchedule | null;
}

export const useTrainerScheduleQuery = ({
  lessonDt,
  lessonEndDt,
  lessonStartDt,
}: TrainerScheduleRequest) => {
  const queryKey = ['schedule', lessonDt, lessonStartDt, lessonEndDt].filter(Boolean);
  const queryParams = new URLSearchParams({
    ...(lessonDt && { lessonDt }),
    ...(lessonStartDt && { lessonStartDt }),
    ...(lessonEndDt && { lessonEndDt }),
  });

  return useQuery<TrainerScheduleResponse, BaseError>({
    queryKey,
    queryFn: async () => {
      const url = `/api/schedule/v1/all?${queryParams.toString()}`;
      const res = await authApi.get<BaseResponse<TrainerScheduleResponse>>(url);
      return res.data.data;
    },
    initialData: {
      trainerName: '',
      schedule: null,
    },
  });
};
