import { useInfiniteQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

type HistoryTypeKey =
  | 'COURSE_CREATE'
  | 'PLUS_CNT'
  | 'MINUS_CNT'
  | 'ONE_LESSON'
  | 'RESERVATION'
  | 'RESERVATION_CANCEL';

interface CourseItem {
  courseId: number;
  lessonCnt: number;
  remainLessonCnt: number;
  createdAt: string;
}

interface CourseHistoryItem {
  courseHistoryId: number;
  cnt: number;
  calculation: string;
  type: HistoryTypeKey;
  createdAt: string;
}

interface StudentCourse {
  course: CourseItem;
  courseHistories: CourseHistoryItem[];
}

export const useMyCourseHistoryQuery = (size: number) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['myCourseHistory'],
    queryFn: async ({ pageParam }) => {
      const res = await api.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/course?page=${pageParam as number}&size=${size}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return lastPage.courseHistories ? allPages.length : undefined;
    },
  });
};
