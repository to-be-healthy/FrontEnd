import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { Member } from '../model/types';

type NotRegisteredStudentsList = Member[] | null;

export const useNotRegisteredStudentsQuery = () => {
  return useQuery<NotRegisteredStudentsList, BaseError>({
    queryKey: ['notRegisteredStudents'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<NotRegisteredStudentsList>>(
        '/api/trainers/v1/unattached-members'
      );
      return result.data.data;
    },
  });
};
