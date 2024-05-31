import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Log } from '../model/types';

interface TrainerLogListRequest {
  studentId: number;
  searchDate?: string;
}

interface TrainerLogListResponse extends Pageable {
  studentName: string;
  content: Log[];
}

export const useTrainerLogListQuery = ({
  studentId,
  searchDate,
}: TrainerLogListRequest) => {
  return useQuery<TrainerLogListResponse, BaseError>({
    queryKey: ['trainerLogList', studentId, searchDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchDate) {
        queryParams.append('searchDate', searchDate);
      }
      const url = `/api/lessonhistory/v1/student/${studentId}?${queryParams.toString()}`;
      const result = await authApi.get<BaseResponse<TrainerLogListResponse>>(url);
      return result.data.data;
    },
  });
};
