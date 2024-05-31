import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Comment, Log } from '../model/types';

interface TrainerLogDetailRequest {
  memberId: number;
  lessonHistoryId: number;
}

interface LogDetail extends Log {
  comments: Comment[];
}

export const useTrainerLogDetailQuery = ({
  memberId,
  lessonHistoryId,
}: TrainerLogDetailRequest) => {
  return useQuery<LogDetail, BaseError>({
    queryKey: ['trainerLogDetail', memberId, lessonHistoryId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<LogDetail>>(
        `/api/lessonhistory/v1/${lessonHistoryId}`
      );
      return result.data.data;
    },
  });
};
