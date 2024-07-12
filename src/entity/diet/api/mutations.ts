import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

import { HomeDietData, RegisterAndEditDiet } from '../model/types';

interface CreateLogCommentRequest {
  parentCommentId?: number;
  content: string;
}
export const useCreateDietCommentMutation = (dietId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogCommentRequest>({
    mutationFn: async ({ content, parentCommentId }) => {
      const payload: { content: string; parentCommentId?: number } = { content };
      if (parentCommentId !== undefined) {
        payload.parentCommentId = parentCommentId;
      }

      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/diets/v1/${dietId}/comments`,
        payload
      );
      return result.data;
    },
  });
};

interface DeleteLogCommentRequest {
  commentId: number;
  dietId: number;
}

export const useDeleteDietCommentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, DeleteLogCommentRequest>({
    mutationFn: async ({ commentId, dietId }) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/diets/v1/${dietId}/comments/${commentId}`
      );
      return result.data;
    },
  });
};

export const useDeleteDietMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (dietId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(`/api/diets/v1/${dietId}`);
      return result.data;
    },
  });
};

export const useDietCancelLikeMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (dietId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/diets/v1/${dietId}/like`
      );
      return result.data;
    },
  });
};

export const useDietLikeMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (dietId: number) => {
      const result = await authApi.post<BaseResponse<null>>(
        `/api/diets/v1/${dietId}/like`
      );
      return result.data;
    },
  });
};

export const useDietShowNoticeMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (alarmStatus: string) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/members/v1/diet-notice?alarmStatus=${alarmStatus}`
      );
      return result.data;
    },
  });
};

export const useEditDietMutation = (dietId: number) => {
  return useMutation<BaseResponse<HomeDietData>, BaseError, RegisterAndEditDiet>({
    mutationFn: async (params) => {
      const result = await authApi.patch<BaseResponse<HomeDietData>>(
        `/api/diets/v1/${dietId}`,
        params
      );
      return result.data;
    },
  });
};

export const useRegisterDietMutation = () => {
  return useMutation<BaseResponse<HomeDietData>, BaseError, RegisterAndEditDiet>({
    mutationFn: async (params) => {
      const result = await authApi.post<BaseResponse<HomeDietData>>(
        `/api/diets/v1`,
        params
      );
      return result.data;
    },
  });
};

interface RegisterDietRequest {
  type: string;
  file: string | null;
  fast: boolean;
  eatDate: string;
}

export const useRegisterHomeDietMutation = () => {
  return useMutation<BaseResponse<HomeDietData>, BaseError, RegisterDietRequest>({
    mutationFn: async (params) => {
      const result = await authApi.post<BaseResponse<HomeDietData>>(
        `/api/diets/v1/home`,
        params
      );
      return result.data;
    },
  });
};
