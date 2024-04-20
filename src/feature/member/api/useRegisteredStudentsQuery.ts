import { useQuery } from '@tanstack/react-query';

import { api } from '@/entity/auth/api/authApi';
import { BaseError, BaseResponse } from '@/shared/api';

import { RegisteredStudent } from '../model/types';

type RegisteredStudentsListResponse = RegisteredStudent[] | null;

export const useRegisteredStudentsQuery = () => {
  return useQuery<RegisteredStudentsListResponse, BaseError>({
    queryKey: ['registeredStudents'],
    queryFn: async () => {
      const result = await api.get<BaseResponse<RegisteredStudentsListResponse>>(
        '/api/trainers/v1/members'
      );
      return result.data.data;
    },
  });
};
