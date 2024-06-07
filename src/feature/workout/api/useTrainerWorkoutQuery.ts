import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi, SocialType } from '@/entity/auth';
import { Gym } from '@/entity/gym';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Workout } from '../model/types';

const DEFAULT_SIZE = 10;

// TODO) 필요없는 회원 정보도 반환되고 있음
interface WorkoutMainDate {
  id: number;
  userId: string;
  email: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  delYn: boolean;
  profile: {
    id: number;
    fileName: string;
    originalName: string;
    extension: string;
    fileSize: number;
    fileUrl: string;
  } | null;
  memberType: 'STUDENT' | 'TRAINER';
  pushAlarmStatus: 'ENABLED' | 'DISABLE';
  feedbackAlarmStatus: 'ENABLED' | 'DISABLE';
  gym: Gym | null;
  socialType: SocialType;
}

interface WorkoutRequest {
  searchDate: string;
  size?: number;
  memberId: number;
}

interface WorkoutResponse extends Pageable {
  content: Workout[];
  mainData: WorkoutMainDate;
}

export const useTrainerWorkoutQuery = ({
  memberId,
  searchDate,
  size = DEFAULT_SIZE,
}: WorkoutRequest) => {
  return useInfiniteQuery<WorkoutResponse, BaseError>({
    queryKey: ['workoutList', { memberId, searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<WorkoutResponse>>(
        `/api/members/v1/${memberId}/workout-histories?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: WorkoutResponse, allPages: WorkoutResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
