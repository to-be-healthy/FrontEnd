import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface Pageable<T> {
  content: T;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

interface StudentLogListRequest {
  studentId: number;
  searchDate: string;
}

interface Log {
  id: number;
  title: string;
  content: string;
  comments: Comment[];
  commentCount: number;
  createdAt: string;
  student: string;
  trainer: string;
  lessonDt: string;
  lessonTime: string;
  attendanceStatus: '출석' | '미출석';
  files: string[];
}

type StudentLogList = Pageable<Log[]>;

export const useStudentLogListQuery = ({
  studentId,
  searchDate,
}: StudentLogListRequest) => {
  return useQuery<Pageable<Log[]>, BaseError>({
    queryKey: ['studentLogList'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<StudentLogList>>(
        `/api/lessonhistory/v1/detail/${studentId}?searchDate=${searchDate}`
      );
      return result.data.data;
    },
  });
};
