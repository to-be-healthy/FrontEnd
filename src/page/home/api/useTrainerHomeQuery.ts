import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageFile } from '@/feature/log';
import { TrainerSchedule } from '@/feature/schedule';
import { BaseError, BaseResponse } from '@/shared/api';

interface BestStudent {
  memberId: number;
  name: string;
  userId: string;
  email: string;
  ranking: number;
  lessonCnt: number;
  remainLessonCnt: number;
  nickName: string | null;
  fileUrl: ImageFile | null;
  courseId: number;
}

interface TrainerHomeInfo {
  studentCount: number;
  bestStudents: BestStudent[] | null;
  todaySchedule: {
    trainerName: string;
    scheduleTotalCount: number;
    before: TrainerSchedule[];
    after: TrainerSchedule[];
  };
}

const useTrainerHomeQuery = () => {
  return useQuery<TrainerHomeInfo, BaseError>({
    queryKey: ['TrainerHome'],
    queryFn: async () => {
      const result =
        await authApi.get<BaseResponse<TrainerHomeInfo>>(`/api/home/v1/trainer`);
      return result.data.data;
    },
  });
};

export { type TrainerHomeInfo, useTrainerHomeQuery };
