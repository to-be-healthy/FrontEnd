import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { DayOfWeek } from '../model/type';

interface ClassTimeSettingData {
  startTime: string;
  endTime: string;
  lunchStartTime: string;
  lunchEndTime: string;
  closedDt: DayOfWeek[];
  sessionTime: 'HALF_HOUR' | 'ONE_HOUR' | 'ONE_AND_HALF_HOUR' | 'TWO_HOUR'; //타입수정
}

export const useTrainerClassTimeSettingMutation = () => {
  return useMutation<BaseResponse<ClassTimeSettingData>, BaseError, ClassTimeSettingData>(
    {
      mutationFn: async (data: ClassTimeSettingData) => {
        console.log(data);
        const result = await authApi.post<BaseResponse<ClassTimeSettingData>>(
          `/api/schedule/v1/default-lesson-time`,
          data
        );
        return result.data;
      },
    }
  );
};
