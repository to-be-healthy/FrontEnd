import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface AddScheduleRequest {
  scheduleId: number;
  studentId: number;
}

interface AddScheduleResponse {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  studentName: string;
}

export const useAddScheduleMutation = () => {
  return useMutation<BaseResponse<AddScheduleResponse>, BaseError, AddScheduleRequest>({
    mutationFn: async ({ scheduleId, studentId }) => {
      const result = await authApi.post<BaseResponse<AddScheduleResponse>>(
        `/api/schedule/v1/${scheduleId}/${studentId}`
      );
      return result.data;
    },
  });
};
