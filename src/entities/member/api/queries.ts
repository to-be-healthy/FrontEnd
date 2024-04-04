import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { RegisteredStudent } from '../model/types';

export const useRegisteredStudentsList = () => {
  return useQuery<RegisteredStudent[], BaseError>({
    queryKey: ['registeredStudents'],
    queryFn: async () => {
      const result = await api.get<BaseResponse<RegisteredStudent[]>>(
        '/api/trainers/v1/members'
      );
      return result.data.data;
    },
    initialData: [],
  });
};
