import { useQuery } from '@tanstack/react-query';

import { api, BaseError, BaseResponse } from '@/shared/api';

import { Member, RegisteredStudentsListResponse } from '../model/types';

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

const useMyInfo = () => {
  return useQuery<Member, BaseError>({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const result = await api.get<BaseResponse<Member>>(`/api/members/v1/me`);
      return result.data.data;
    },
  });
};

export { useMyInfo, useRegisteredStudentsList };
