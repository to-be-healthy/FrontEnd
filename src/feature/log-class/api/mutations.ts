import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { ImageType } from '@/entity/image';
import { BaseError, BaseResponse } from '@/shared/api';

interface CreateLogCommentRequest {
  images?: ImageType[];
  content: string;
}
export const useCreateLogCommentMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogCommentRequest>({
    mutationFn: async ({ content, images }) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment`,
        { content, uploadFiles: images }
      );
      return result.data;
    },
  });
};

interface CreateLogRequest {
  uploadFiles: ImageType[];
  title: string;
  content: string;
  studentId: number;
  scheduleId: number;
}

export const useCreateLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1`,
        payload
      );
      return result.data;
    },
  });
};

interface CreateLogReplyRequest {
  images?: ImageType[];
  content: string;
  commentId: number;
}

export const useCreateLogReplyMutation = (logId: number) => {
  return useMutation<BaseResponse<boolean>, BaseError, CreateLogReplyRequest>({
    mutationFn: async ({ images, content, commentId }) => {
      const payload = {
        content,
        uploadFiles: images,
      };
      const result = await authApi.post<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}/comment/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};

interface DeleteLogCommentRequest {
  id: number;
}

export const useDeleteCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteLogCommentRequest>({
    mutationFn: async ({ id }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${id}`
      );
      return result.data;
    },
  });
};

interface DeleteLogRequest {
  logId: number;
}

export const useDeleteLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, DeleteLogRequest>({
    mutationFn: async ({ logId }) => {
      const result = await authApi.delete<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}`
      );
      return result.data;
    },
  });
};

interface EditLogCommentRequest {
  images?: ImageType[];
  content: string;
  commentId: number;
}

export const useEditLogCommentMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditLogCommentRequest>({
    mutationFn: async ({ content, commentId, images }) => {
      const payload = {
        content,
        uploadFiles: images,
      };
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/comment/${commentId}`,
        payload
      );
      return result.data;
    },
  });
};

interface EditLogRequest {
  logId: number;
  uploadFiles: ImageType[];
  title: string;
  content: string;
}

export const useEditLogMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, EditLogRequest>({
    mutationFn: async ({ logId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        `/api/lessonhistory/v1/${logId}`,
        payload
      );
      return result.data;
    },
  });
};
