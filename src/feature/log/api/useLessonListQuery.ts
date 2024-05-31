import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { UnwrittenLesson } from '../model/types';

export const useLessonListQuery = (date?: string) => {
  return useQuery<UnwrittenLesson[], BaseError>({
    queryKey: ['UnwrittenLessonList', date],
    queryFn: async () => {
      const lessonDateTime = date ?? dayjs().format('YYYY-MM-DD');
      const result = await authApi.get<BaseResponse<UnwrittenLesson[]>>(
        `/api/lessonhistory/v1/unwritten?lessonDateTime=${lessonDateTime}`
      );
      return result.data.data;
    },
  });
};
