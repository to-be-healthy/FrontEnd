import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { StudentPoint } from '../model/types';

interface MyPointHistory {
  searchDate: string;
  size: number;
}

export const useMyPointHistoryQuery = ({ searchDate, size }: MyPointHistory) => {
  return useInfiniteQuery<StudentPoint, BaseError>({
    queryKey: ['myPointHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentPoint>>(
        `/api/members/v1/point?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentPoint, allPages: StudentPoint[]) => {
      return lastPage.pointHistories ? allPages.length : undefined;
    },
  });
};
