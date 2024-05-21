import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { StudentCourse } from '../model/types';

export const useMyCourseHistoryQuery = (size: number, searchDate: string) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['myCourseHistory', searchDate],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/course?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return lastPage.courseHistories ? allPages.length : undefined;
    },
  });
};
