import { useInfiniteQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { courseHistoryCodeDescription } from '../const';
import { CourseItem } from '../model/types';

type CourseHistory = keyof typeof courseHistoryCodeDescription;

interface CourseHistoryItem {
  courseHistoryId: number;
  cnt: number;
  calculation: string;
  type: CourseHistory;
  createdAt: string;
}

interface StudentCourse {
  course: CourseItem;
  courseHistories: CourseHistoryItem[];
}

export const useStudentCourseDetailQuery = (memberId: number, size: number) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['studentCourseDetail', memberId, size],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/${memberId}/course?page=${pageParam as number}&size=${size}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      if (lastPage.courseHistories && lastPage.courseHistories.length === size) {
        return allPages.length;
      }
      return undefined;
    },
  });
};
