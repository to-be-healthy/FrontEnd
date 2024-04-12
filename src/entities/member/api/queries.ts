import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { RegisteredStudentsListResponse } from '../model/types';

const useRegisteredStudentsList = () => {
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

export { useRegisteredStudentsList };
