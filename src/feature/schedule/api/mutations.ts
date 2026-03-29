import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { ClassTimeSettingData } from '../model/type';

interface AddScheduleRequest {
  scheduleId: number;
  studentId: number;
}

interface AddScheduleResponse {
  scheduleId: number;
  lessonDt: string;
  lessonStartTime: string;
  lessonEndTime: string;
  studentName: string;
}

export const useAddScheduleMutation = () => {
  return useMutation<BaseResponse<AddScheduleResponse>, BaseError, AddScheduleRequest>({
    mutationFn: async ({ scheduleId, studentId }) => {
      const result = await authApi.post<BaseResponse<AddScheduleResponse>>(
        `/api/v1/schedule/${scheduleId}/${studentId}`
      );
      return result.data;
    },
  });
};

export const useShowNoticeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (alarmStatus: string) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/v1/members/schedule-notice?alarmStatus=${alarmStatus}`
      );
      return result.data;
    },
  });
};

interface CancelScheduleData {
  studentId: number;
  trainerId: number;
  scheduleId: number;
  waitingStudentId: null;
  scheduleTime: string;
}

export const useStudentCancelReservationScheduleMutation = () => {
  return useMutation<BaseResponse<CancelScheduleData>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<CancelScheduleData>>(
        `/api/v1/schedule/${scheduleId}`
      );
      return result.data;
    },
  });
};

export const useStudentCancelWaitingScheduleMutation = () => {
  return useMutation<BaseResponse<CancelScheduleData>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<CancelScheduleData>>(
        `/api/v1/schedule/waiting/${scheduleId}`
      );
      return result.data;
    },
  });
};

export const useStudentReservationScheduleMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/v1/schedule/${scheduleId}`
      );
      return result.data;
    },
  });
};

export const useStudentWaitingScheduleMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/v1/schedule/waiting/${scheduleId}`
      );
      return result.data;
    },
  });
};

/**
 *
 * @description 등록된 학생의 수업 취소
 */
export const useTrainerCancelReservationMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/v1/schedule/trainer/${scheduleId}`
      );
      return result.data;
    },
  });
};

/**
 *
 * @description 노쇼 처리하기
 */
export const useTrainerChangeNoShowMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/v1/schedule/no-show/${scheduleId}`
      );
      return result.data;
    },
  });
};

interface TrainerChangeReservation {
  status: 'AVAILABLE' | 'DISABLED';
  scheduleIds: number[];
}

export const useTrainerChangeReservationMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, TrainerChangeReservation>({
    mutationFn: async ({ status, scheduleIds }: TrainerChangeReservation) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/v1/schedule/trainer/${status}`,
        { scheduleIds }
      );
      return result.data;
    },
  });
};

/**
 *
 * @description 노쇼 취소하기
 */
export const useTrainerChangeShowMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, number>({
    mutationFn: async (scheduleId: number) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/v1/schedule/no-show/${scheduleId}`
      );
      return result.data;
    },
  });
};

export const useTrainerClassTimeSettingMutation = () => {
  return useMutation<BaseResponse<ClassTimeSettingData>, BaseError, ClassTimeSettingData>(
    {
      mutationFn: async (data: ClassTimeSettingData) => {
        const result = await authApi.post<BaseResponse<ClassTimeSettingData>>(
          `/api/v1/schedule/default-lesson-time`,
          data
        );
        return result.data;
      },
    }
  );
};

interface CreateWeeklySchedulesRequest {
  lessonStartDt: string;
  lessonEndDt: string;
}

export const useTrainerCreateSchedulesMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateWeeklySchedulesRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        '/api/v1/schedule',
        payload
      );
      return result.data;
    },
  });
};
