import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { StudentDetail } from '../model/types';

export const useStudentDetailQuery = (memberId: number) => {
  return useQuery<StudentDetail, BaseError>({
    queryKey: ['registeredStudent', memberId],
    queryFn: async () => {
      const result = await api.get<BaseResponse<StudentDetail>>(
        `/api/trainers/v1/members/${memberId}`
      );
      return result.data.data;
    },
  });
};
