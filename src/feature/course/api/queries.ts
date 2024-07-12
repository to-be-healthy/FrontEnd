import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { StudentCourse } from '@/feature/manage';
import { BaseError, BaseResponse } from '@/shared/api';

interface MyCourseHistoryRequest {
  searchDate: string;
  size: number;
}

export const useMyCourseHistoryQuery = ({ searchDate, size }: MyCourseHistoryRequest) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['myCourseHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/course?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

interface StudentCourseDetailRequest {
  memberId: number;
  searchDate: string;
  size: number;
}

export const useStudentCourseDetailQuery = ({
  memberId,
  searchDate,
  size,
}: StudentCourseDetailRequest) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['studentCourseHistory', { memberId, searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/${memberId}/course?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
