import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface DietResponse {
  dietNoticeStatus: 'DISABLE' | 'ENABLED';
  uploadDays: string[];
}

interface DietRequest {
  startDate: string;
  endDate: string;
}

export const useStudentCalendarMyDietListQuery = ({
  startDate,
  endDate,
}: DietRequest) => {
  return useQuery<DietResponse, BaseError>({
    queryKey: ['studentCalendarMyDietList', startDate, endDate],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<DietResponse>>(
        `/api/diets/v1/upload-date?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data.data;
    },
  });
};
