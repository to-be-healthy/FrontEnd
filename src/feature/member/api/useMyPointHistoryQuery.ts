import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { StudentPoint } from '../model/types';

export const useMyPointHistoryQuery = (size: number) => {
  return useInfiniteQuery<StudentPoint, BaseError>({
    queryKey: ['myPointHistory'],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentPoint>>(
        `/api/members/v1/point?page=${pageParam as number}&size=${size}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentPoint, allPages: StudentPoint[]) => {
      return lastPage.pointHistories ? allPages.length : undefined;
    },
  });
};
