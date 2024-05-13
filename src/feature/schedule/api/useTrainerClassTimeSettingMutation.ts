import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { ClassTimeOptions, DayOfWeek } from '../model/type';

interface ClassTimeSettingData {
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  closedDt: DayOfWeek[];
  sessionTime: ClassTimeOptions;
}

export const useTrainerClassTimeSettingMutation = () => {
  return useMutation<BaseResponse<ClassTimeSettingData>, BaseError, ClassTimeSettingData>(
    {
      mutationFn: async (data: ClassTimeSettingData) => {
        const result = await authApi.post<BaseResponse<ClassTimeSettingData>>(
          `/api/schedule/v1/default-lesson-time`,
          data
        );
        return result.data;
      },
    }
  );
};
