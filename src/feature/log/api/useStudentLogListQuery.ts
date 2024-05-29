import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Log } from '../model/types';

interface StudentLogListRequest {
  studentId: number;
  searchDate?: string;
}

interface StudentLogListResponse extends Pageable {
  studentName: string;
  content: Log[];
}

export const useStudentLogListQuery = ({
  studentId,
  searchDate,
}: StudentLogListRequest) => {
  return useQuery<StudentLogListResponse, BaseError>({
    queryKey: ['studentLogList', studentId, searchDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchDate) {
        queryParams.append('searchDate', searchDate);
      }
      const url = `/api/lessonhistory/v1/student/${studentId}?${queryParams.toString()}`;
      const result = await authApi.get<BaseResponse<StudentLogListResponse>>(url);
      return result.data.data;
    },
  });
};
