import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

import { Exercise } from '../model/types';

interface TrainerWorkoutDetailRequest {
  workoutHistoryId: number;
}

interface TrainerWorkoutDetail {
  workoutHistoryId: number;
  createdAt: string;
  files: ImageType[];
  content: string;
  completedExercises: Exercise[];
  commentCnt: number;
  likeCnt: number;
  liked: false;
  viewMySelf: boolean;
  member: {
    memberId: number;
    name: string;
    fileUrl: string;
  };
}

export const useTrainerWorkoutDetailQuery = ({
  workoutHistoryId,
}: TrainerWorkoutDetailRequest) => {
  return useQuery<TrainerWorkoutDetail, BaseError>({
    queryKey: ['workoutDetail', workoutHistoryId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<TrainerWorkoutDetail>>(
        `/api/workout-histories/v1/${workoutHistoryId}`
      );
      return result.data.data;
    },
  });
};
