import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { Member, RegisteredStudent, StudentDetail } from '@/feature/manage';
import { BaseError, BaseResponse } from '@/shared/api';

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

type RegisteredStudentsListResponse = RegisteredStudent[] | null;

export const useRegisteredStudentsQuery = () => {
  return useQuery<RegisteredStudentsListResponse, BaseError>({
    queryKey: ['registeredStudents'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<RegisteredStudentsListResponse>>(
        '/api/trainers/v1/members'
      );
      return result.data.data;
    },
  });
};

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
