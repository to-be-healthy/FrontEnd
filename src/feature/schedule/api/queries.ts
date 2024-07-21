import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { CLASS_TIME_DEFAULT } from '@/feature/schedule/consts';
import { BaseError, BaseResponse } from '@/shared/api';

import {
  AllScheduleData,
  ClassTimeSettingData,
  MyReservationResponse,
  MyWaitingResponse,
  TrainerWeeklySchedule,
} from '../model/type';

interface MappingResponse {
  mapped: boolean;
}
export const useCheckTrainerMemberMappingQuery = () => {
  return useQuery<MappingResponse, BaseError>({
    queryKey: ['checkTrainerMemberMapping'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MappingResponse>>(
        `/api/members/v1/trainer-mapping`
      );
      return res.data.data;
    },
  });
};

export const useGetTrainerClassTimeSettingQuery = () => {
  return useQuery<ClassTimeSettingData, BaseError>({
    queryKey: ['TrainerClassTimeSetting'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<ClassTimeSettingData>>(
        `/api/schedule/v1/default-lesson-time`
      );
      if (!res.data.data.lessonStartTime && !res.data.data.lessonEndTime) {
        return CLASS_TIME_DEFAULT;
      }
      return res.data.data;
    },
  });
};

interface ScheduleResponse {
  scheduleNoticeStatus: 'ENABLED' | 'DISABLE';
  morning: AllScheduleData[];
  afternoon: AllScheduleData[];
}

export const useScheduleListQuery = (lessonStartDt: string) => {
  return useQuery<ScheduleResponse, BaseError>({
    queryKey: ['scheduleList', lessonStartDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<ScheduleResponse>>(
        `/api/schedule/v1/student/all?lessonStartDt=${lessonStartDt}&lessonEndDt=${lessonStartDt}`
      );
      return res.data.data;
    },
  });
};

interface CalendarMyReservationResponse {
  reservationDays: string[];
}
interface MyReservationProps {
  lessonStartDt: string;
  lessonEndDt: string;
}
export const useStudentCalendarMyReservationListQuery = ({
  lessonStartDt,
  lessonEndDt,
}: MyReservationProps) => {
  return useQuery<CalendarMyReservationResponse, BaseError>({
    queryKey: ['StudentCalendarMyReservationList', lessonStartDt, lessonEndDt],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<CalendarMyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation?lessonStartDt=${lessonStartDt}&lessonEndDt=${lessonEndDt}`
      );
      return res.data.data;
    },
  });
};

export const useStudentMyLastReservationListQuery = (searchDate: string) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['StudentMyLastReservationList', searchDate],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation/old?searchDate=${searchDate}`
      );
      return res.data.data;
    },
  });
};

export const useStudentMyReservationListQuery = () => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['StudentMyReservationList'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/schedule/v1/student/my-reservation/new`
      );
      return res.data.data;
    },
  });
};

export const useStudentMyWaitingListQuery = () => {
  return useQuery<MyWaitingResponse, BaseError>({
    queryKey: ['StudentMyWaitingList'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyWaitingResponse>>(
        `/api/schedule/waiting/v1/my-waiting`
      );
      return res.data.data;
    },
  });
};

interface TrainerScheduleRequest {
  lessonDt?: string;
  lessonStartDt?: string;
  lessonEndDt?: string;
}

interface TrainerScheduleResponse {
  trainerName: string;
  earliestLessonStartTime: string;
  latestLessonEndTime: string;
  schedule: TrainerWeeklySchedule | null;
}

export const useTrainerScheduleQuery = ({
  lessonDt,
  lessonEndDt,
  lessonStartDt,
}: TrainerScheduleRequest) => {
  const queryKey = ['schedule', lessonStartDt].filter(Boolean);
  const queryParams = new URLSearchParams({
    ...(lessonDt && { lessonDt }),
    ...(lessonStartDt && { lessonStartDt }),
    ...(lessonEndDt && { lessonEndDt }),
  });

  return useQuery<TrainerScheduleResponse, BaseError>({
    queryKey,
    queryFn: async () => {
      const url = `/api/schedule/v1/all?${queryParams.toString()}`;
      const res = await authApi.get<BaseResponse<TrainerScheduleResponse>>(url);
      return res.data.data;
    },
  });
};

interface LastReservationProps {
  searchDate: string;
  memberId: number;
}
export const useTrainerStudentLastReservationListQuery = ({
  searchDate,
  memberId,
}: LastReservationProps) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['TrainerStudentLastReservationList', searchDate, memberId],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/trainers/v1/reservation/old?searchDate=${searchDate}&memberId=${memberId}`
      );
      return res.data.data;
    },
  });
};

export const useTrainerStudentReservationListQuery = (memberId: number) => {
  return useQuery<MyReservationResponse, BaseError>({
    queryKey: ['TrainerStudentReservationList', memberId],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<MyReservationResponse>>(
        `/api/trainers/v1/reservation/new?memberId=${memberId}`
      );
      return res.data.data;
    },
  });
};
