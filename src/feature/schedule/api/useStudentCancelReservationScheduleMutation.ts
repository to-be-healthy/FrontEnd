import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CancelScheduleData {
  studentId: number;
  trainerId: number;
  scheduleId: number;
  waitingStudentId: null;
  scheduleTime: string;
}

export const useStudentCancelReservationScheduleMutation = () => {
  return useMutation<BaseResponse<CancelScheduleData>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<CancelScheduleData>>(
        `/api/schedule/v1/${scheduleId}`
      );
      return result.data;
    },
  });
};
