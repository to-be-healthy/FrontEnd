'use client';

import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { StudentDetail } from '../model/types';

export const useStudentDetailQuery = (memberId: number) => {
  return useQuery<StudentDetail, BaseError>({
    queryKey: ['registeredStudent', memberId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<StudentDetail>>(
        `/api/trainers/v1/members/${memberId}`
      );
      return result.data.data;
    },
  });
};
