import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Workout, WorkoutMember } from '../model/types';

const DEFAULT_SIZE = 10;

interface CommunityRequest {
  searchDate?: string;
  size?: number;
  memberId?: string | number | null;
}

interface CommunityResponse extends Pageable {
  content: Workout[];
  mainData: WorkoutMember;
}

export const useCommunityQuery = ({
  searchDate,
  size = DEFAULT_SIZE,
  memberId,
}: CommunityRequest = {}) => {
  return useInfiniteQuery<CommunityResponse, BaseError>({
    queryKey: ['workoutList', { memberId }],
    queryFn: async ({ pageParam }) => {
      const queryParams = new URLSearchParams();
      queryParams.append('page', (pageParam as number).toString());
      queryParams.append('size', size.toString());
      if (searchDate) {
        queryParams.append('searchDate', searchDate.toString());
      }
      if (memberId) {
        queryParams.append('memberId', memberId.toString());
      }

      try {
        const res = await authApi.get<BaseResponse<CommunityResponse>>(
          `/api/community/v1?${queryParams.toString()}`
        );
        return res.data.data;
      } catch (error) {
        throw new Error('문제가 발생했습니다.');
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: CommunityResponse, allPages: CommunityResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
    retry: 1,
  });
};
