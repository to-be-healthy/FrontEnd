import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { Comment, Log, UnwrittenLesson } from '../model/types';

export const useLessonListQuery = ({
  studentId,
  lessonDate,
}: {
  studentId?: number;
  lessonDate?: string | null;
}) => {
  return useQuery<UnwrittenLesson[], BaseError>({
    queryKey: ['lessonList', { studentId, lessonDate }],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (studentId) {
        queryParams.append('studentId', studentId.toString());
      }
      if (lessonDate) {
        queryParams.append('lessonDate', lessonDate);
      }
      const result = await authApi.get<BaseResponse<UnwrittenLesson[]>>(
        `/api/lessonhistory/v1/unwritten?${queryParams.toString()}`
      );
      return result.data.data;
    },
  });
};

interface StudentLogDetailRequest {
  lessonHistoryId: number;
}

interface LogDetail extends Log {
  comments: Comment[];
}

export const useLogDetailQuery = ({ lessonHistoryId }: StudentLogDetailRequest) => {
  return useQuery<LogDetail, BaseError>({
    queryKey: ['logDetail', lessonHistoryId],
    queryFn: async () => {
      const result = await authApi.get<BaseResponse<LogDetail>>(
        `/api/lessonhistory/v1/${lessonHistoryId}`
      );
      return result.data.data;
    },
  });
};

interface StudentLogListRequest {
  searchDate?: string;
}

interface StudentLogListResponse extends Pageable {
  studentName: string;
  content: Log[];
}

export const useStudentLogListQuery = ({ searchDate }: StudentLogListRequest) => {
  return useQuery<StudentLogListResponse, BaseError>({
    queryKey: ['studentLogList', searchDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchDate) {
        queryParams.append('searchDate', searchDate);
      }
      const url = `/api/lessonhistory/v1?${queryParams.toString()}`;
      const result = await authApi.get<BaseResponse<StudentLogListResponse>>(url);
      return result.data.data;
    },
  });
};

interface TrainerLogListRequest {
  studentId: number;
  searchDate?: string;
}

interface TrainerLogListResponse extends Pageable {
  studentName: string;
  content: Log[];
}

export const useTrainerLogListQuery = ({
  studentId,
  searchDate,
}: TrainerLogListRequest) => {
  return useQuery<TrainerLogListResponse, BaseError>({
    queryKey: ['trainerLogList', studentId, searchDate],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (searchDate) {
        queryParams.append('searchDate', searchDate);
      }
      const url = `/api/lessonhistory/v1/student/${studentId}?${queryParams.toString()}`;
      const result = await authApi.get<BaseResponse<TrainerLogListResponse>>(url);
      return result.data.data;
    },
  });
};
