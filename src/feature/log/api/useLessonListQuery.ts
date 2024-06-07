import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { UnwrittenLesson } from '../model/types';

export const useLessonListQuery = ({
  studentId,
  lessonDate,
}: {
  studentId?: number;
  lessonDate?: string | null;
}) => {
  return useQuery<UnwrittenLesson[], BaseError>({
    queryKey: ['lessonList', { studentId, lessonDate }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (studentId) {
        queryParams.append('studentId', studentId.toString());
      }
      if (lessonDate) {
        queryParams.append('lessonDate', lessonDate);
      }
      const result = await authApi.get<BaseResponse<UnwrittenLesson[]>>(
        `/api/lessonhistory/v1/unwritten?${queryParams.toString()}`
      );
      return result.data.data;
    },
  });
};
