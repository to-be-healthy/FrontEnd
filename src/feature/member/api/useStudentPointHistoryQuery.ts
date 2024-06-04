import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { StudentPoint } from '../model/types';

interface MyPointHistory {
  searchDate: string;
  size: number;
  memberId: number;
}
export const useStudentPointHistoryQuery = ({
  searchDate,
  size,
  memberId,
}: MyPointHistory) => {
  return useInfiniteQuery<StudentPoint, BaseError>({
    queryKey: ['studentPointHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentPoint>>(
        `/api/members/v1/${memberId}/point?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentPoint, allPages: StudentPoint[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
