import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { HomeDietData } from '@/entity/diet';
import { Gym } from '@/entity/gym';
import { BaseError, BaseResponse } from '@/shared/api';

import {
  RegisteredStudent,
  StudentCourse,
  StudentDetail,
  StudentPoint,
} from '../model/types';
import { Member } from '../model/types';
import { CourseItem, StudentPointItem, StudentRank } from '../model/types';

interface MyCourseHistoryRequest {
  searchDate: string;
  size: number;
}

export const useMyCourseHistoryQuery = ({ searchDate, size }: MyCourseHistoryRequest) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['myCourseHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/course?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

export const useMyInfoQuery = () => {
  return useQuery<Member, BaseError>({
    queryKey: ['myinfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<Member>>(`/api/members/v1/me`);
      return result.data.data;
    },
  });
};

interface MyPointHistory {
  searchDate: string;
  size: number;
}

export const useMyPointHistoryQuery = ({ searchDate, size }: MyPointHistory) => {
  return useInfiniteQuery<StudentPoint, BaseError>({
    queryKey: ['myPointHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentPoint>>(
        `/api/members/v1/point?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentPoint, allPages: StudentPoint[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

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

interface StudentCourseDetailRequest {
  memberId: number;
  searchDate: string;
  size: number;
}

export const useStudentCourseDetailQuery = ({
  memberId,
  searchDate,
  size,
}: StudentCourseDetailRequest) => {
  return useInfiniteQuery<StudentCourse, BaseError>({
    queryKey: ['studentCourseHistory', { memberId, searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentCourse>>(
        `/api/members/v1/${memberId}/course?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentCourse, allPages: StudentCourse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
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

interface HomeDataResponse {
  course: CourseItem;
  point: StudentPointItem;
  rank: StudentRank;
  myReservation: {
    scheduleId: number;
    lessonDt: string;
    lessonStartTime: string;
    lessonEndTime: string;
    trainerName: string;
    reservationStatus: string;
  };
  lessonHistory: {
    id: number;
    title: string;
    content: string;
    commentTotalCount: number;
    createdAt: string;
    student: string;
    trainer: string;
    trainerProfile: string;
    scheduleId: number;
    lessonDt: string;
    lessonTime: string;
    feedbackChecked: 'READ' | 'UNREAD';
    attendanceStatus: string;
    files: { fileUrl: string; fileOrder: number; createdAt: string };
  };
  diet: HomeDietData;
  gym: Gym;
}

export const useStudentHomeDataQuery = () => {
  return useQuery<HomeDataResponse, BaseError>({
    queryKey: ['StudentHomeData'],
    queryFn: async () => {
      const result =
        await authApi.get<BaseResponse<HomeDataResponse>>(`/api/home/v1/student`);
      return result.data.data;
    },
  });
};

interface TrainerInfoResponse {
  mappingId: number;
  trainer: {
    id: number;
    email: string;
    name: string;
    profile: {
      id: number;
      fileUrl: string;
    } | null;
    gym: Gym;
  };
}

export const useStudentMypageTrainerInfoQuery = () => {
  return useQuery<TrainerInfoResponse | null, BaseError>({
    queryKey: ['trainerInfo'],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<TrainerInfoResponse | null>>(
        '/api/members/v1/trainer-mapping/info'
      );
      return result.data.data;
    },
  });
};

interface StudentPointHistory {
  searchDate: string;
  size: number;
  memberId: number;
}
export const useStudentPointHistoryQuery = ({
  searchDate,
  size,
  memberId,
}: StudentPointHistory) => {
  return useInfiniteQuery<StudentPoint, BaseError>({
    queryKey: ['studentPointHistory', { searchDate }],
    queryFn: async ({ pageParam }) => {
      const res = await authApi.get<BaseResponse<StudentPoint>>(
        `/api/members/v1/${memberId}/point?page=${pageParam as number}&size=${size}&searchDate=${searchDate}`
      );
      return res.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: StudentPoint, allPages: StudentPoint[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};
