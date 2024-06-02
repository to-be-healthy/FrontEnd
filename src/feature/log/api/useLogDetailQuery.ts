import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Comment, Log } from '../model/types';

interface StudentLogDetailRequest {
  lessonHistoryId: number;
}

interface LogDetail extends Log {
  comments: Comment[];
}

export const useLogDetailQuery = ({ lessonHistoryId }: StudentLogDetailRequest) => {
  return useQuery<LogDetail, BaseError>({
    queryKey: ['logDetail', lessonHistoryId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<LogDetail>>(
        `/api/lessonhistory/v1/${lessonHistoryId}`
      );
      return result.data.data;
    },
  });
};
