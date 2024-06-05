import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { CLASS_TIME_DEFAULT } from '@/feature/schedule/consts';
import { BaseError, BaseResponse } from '@/shared/api';

import { ClassTimeSettingData } from '../model/type';

export const useGetTrainerClassTimeSettingQuery = () => {
  return useQuery<ClassTimeSettingData, BaseError>({
    queryKey: ['TrainerClassTimeSetting'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<ClassTimeSettingData>>(
        `/api/schedule/v1/default-lesson-time`
      );
      if (!res.data.data.lessonStartTime && !res.data.data.lessonEndTime) {
        return CLASS_TIME_DEFAULT;
      }
      return res.data.data;
    },
  });
};
