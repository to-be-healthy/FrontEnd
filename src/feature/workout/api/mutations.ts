import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

import { ExerciseForCreate } from '../model/types';

export const useCancelLikeMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (workoutHistoryId) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/v1/workout-histories/${workoutHistoryId}/like`
      );
      return result.data;
    },
  });
};

interface CreateExerciseRequest {
  category: string;
  names: string;
  muscles: string;
}

export const useCreateExerciseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, CreateExerciseRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<null>>('/api/v1/exercise', payload);
      return result.data;
    },
  });
};

interface CreateWorkoutCommentRequest {
  parentCommentId?: number;
  content: string;
}
export const useCreateWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateWorkoutCommentRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/v1/workout-histories/${workoutHistoryId}/comments`,
        payload
      );
      return result.data;
    },
  });
};

interface CreateWorkoutRequest {
  files?: Omit<ImageType, 'createdAt'>[];
  content: string;
  viewMySelf: boolean;
  completedExercises: ExerciseForCreate[];
}

export const useCreateWorkoutMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, CreateWorkoutRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<null>>(
        '/api/v1/workout-histories',
        payload
      );
      return result.data;
    },
  });
};

export const useDeleteExerciseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (exerciseId) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/v1/exercise/${exerciseId}`
      );
      return result.data;
    },
  });
};

interface DeleteWorkoutCommentRequest {
  commentId: number;
}
export const useDeleteWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteWorkoutCommentRequest>({
    mutationFn: async ({ commentId }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/v1/workout-histories/${workoutHistoryId}/comments/${commentId}`
      );
      return result.data;
    },
  });
};

export const useDeleteWorkoutMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (workoutHistoryId) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/v1/workout-histories/${workoutHistoryId}`
      );
      return result.data;
    },
  });
};

interface EditWorkoutCommentRequest {
  commentId: number;
  content: string;
}
export const useEditWorkoutCommentMutation = (workoutHistoryId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, EditWorkoutCommentRequest>({
    mutationFn: async ({ commentId, content }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/v1/workout-histories/${workoutHistoryId}/comments/${commentId}`,
        { content }
      );
      return result.data;
    },
  });
};

interface EditWorkoutRequest {
  files?: Omit<ImageType, 'createdAt'>[];
  content: string;
  viewMySelf: boolean;
  completedExercises: ExerciseForCreate[];
  workoutHistoryId: number;
}

export const useEditWorkoutMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, EditWorkoutRequest>({
    mutationFn: async ({ workoutHistoryId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<null>>(
        `/api/v1/workout-histories/${workoutHistoryId}`,
        payload
      );
      return result.data;
    },
  });
};

export const useLikeMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (workoutHistoryId) => {
      const result = await authApi.post<BaseResponse<null>>(
        `/api/v1/workout-histories/${workoutHistoryId}/like`
      );
      return result.data;
    },
  });
};

interface UploadImagesRequest {
  uploadFiles: FileList;
}

export const useUploadImageMutation = () => {
  return useMutation<BaseResponse<ImageType[]>, BaseError, UploadImagesRequest>({
    mutationFn: async ({ uploadFiles }) => {
      const formData = new FormData();
      Array.from(uploadFiles).forEach((el) => {
        formData.append('uploadFiles', el);
      });
      const result = await authApi.post<BaseResponse<ImageType[]>>(
        `/api/v1/workout-histories/file`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return result.data;
    },
  });
};
