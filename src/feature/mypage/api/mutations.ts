import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface ChangeEmailRequest {
  email: string;
  emailKey: string;
}

export const useChangeEmailMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ChangeEmailRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        '/api/members/v1/email',
        payload
      );
      return result.data;
    },
  });
};

export const useChangeMyNameMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (name) => {
      const result = await authApi.patch<BaseResponse<string>>(`/api/members/v1/name`, {
        name,
      });
      return result.data;
    },
  });
};

interface ChangePasswordRequest {
  changePassword1: string;
  changePassword2: string;
}

export const useChangePasswordMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, ChangePasswordRequest>({
    mutationFn: async (payload) => {
      const result = await authApi.patch<BaseResponse<boolean>>(
        '/api/members/v1/password',
        payload
      );
      return result.data;
    },
  });
};

export const useDeleteProfileImageMutation = () => {
  return useMutation<BaseResponse<undefined>, BaseError>({
    mutationFn: async () => {
      const result = await authApi.delete<BaseResponse<undefined>>(
        `/api/members/v1/profile`
      );
      return result.data;
    },
  });
};

export const useLogOutMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, undefined>({
    mutationFn: async () => {
      const result = await authApi.post<BaseResponse<boolean>>(`/api/members/v1/logout`);
      return result.data;
    },
  });
};

interface SetProfileImageRequest {
  file: File;
}

interface SetProfileImageResponse {
  fileUrl: string;
  fileName: string;
}

export const useSetProfileImageMutation = () => {
  return useMutation<
    BaseResponse<SetProfileImageResponse>,
    BaseError,
    SetProfileImageRequest
  >({
    mutationFn: async ({ file }) => {
      const formData = new FormData();
      formData.append('file', file);
      const result = await authApi.put<BaseResponse<SetProfileImageResponse>>(
        '/api/members/v1/profile',
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

export const useVerifyPasswordMutation = () => {
  return useMutation<BaseResponse<boolean>, BaseError, string>({
    mutationFn: async (password) => {
      const result = await authApi.post<BaseResponse<boolean>>(
        '/api/members/v1/password',
        {
          password,
        }
      );
      return result.data;
    },
  });
};
