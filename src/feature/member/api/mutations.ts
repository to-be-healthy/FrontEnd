import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { api, BaseError, BaseResponse } from '@/shared/api';

import {
  AppendMemberForm,
  FindIdRequest,
  FindIdResponse,
  FindPasswordRequest,
  FindPasswordResponse,
  InviteForm,
} from '../model/types';

interface StudentCourseInfo {
  courseId: number;
  memberId: number;
  calculation: string;
  type: string;
  updateCnt: string;
}
export const useAddStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, StudentCourseInfo>({
    mutationFn: async ({ courseId, ...payload }) => {
      const result = await authApi.patch<BaseResponse<null>>(
        `/api/course/v1/${courseId}`,
        payload
      );
      return result.data;
    },
  });
};

type AppendMemberRequest = AppendMemberForm & {
  memberId: number;
};

interface AppendMemberResponse {
  uuid: string;
}

export const useAppendMemberMutation = () => {
  return useMutation<BaseResponse<AppendMemberResponse>, BaseError, AppendMemberRequest>({
    mutationFn: async ({ lessonCnt, memberId }) => {
      const result = await authApi.post<BaseResponse<AppendMemberResponse>>(
        `/api/trainers/v1/members/${memberId}`,
        { lessonCnt }
      );
      return result.data;
    },
  });
};

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

export const useDeleteRefundStudentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (memberId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/trainers/v1/members/${memberId}/refund`
      );
      return result.data;
    },
  });
};

export const useDeleteStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (courseId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/course/v1/${courseId}`
      );
      return result.data;
    },
  });
};

export const useDeleteStudentMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, number>({
    mutationFn: async (memberId: number) => {
      const result = await authApi.delete<BaseResponse<null>>(
        `/api/trainers/v1/members/${memberId}`
      );
      return result.data;
    },
  });
};

export const useFcmTokenMutation = () => {
  return useMutation<BaseResponse<string>, BaseError, string>({
    mutationFn: async (token) => {
      const result = await authApi.post<BaseResponse<string>>('/api/push/register', {
        token,
      });
      return result.data;
    },
  });
};

export const useFindIdMutation = () => {
  return useMutation<BaseResponse<FindIdResponse>, BaseError, FindIdRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindIdResponse>>(
        '/api/auth/v1/find/user-id',
        payload
      );
      return result.data;
    },
  });
};

export const useFindPasswordMutation = () => {
  return useMutation<BaseResponse<FindPasswordResponse>, BaseError, FindPasswordRequest>({
    mutationFn: async (payload) => {
      const result = await api.post<BaseResponse<FindPasswordResponse>>(
        '/api/auth/v1/find/password',
        payload
      );
      return result.data;
    },
  });
};

interface InviteResponse {
  uuid: string;
  invitationLink: string;
}

export const useInviteStudentMutation = () => {
  return useMutation<BaseResponse<InviteResponse>, BaseError, InviteForm>({
    mutationFn: async (invitationInfo) => {
      const result = await authApi.post<BaseResponse<InviteResponse>>(
        '/api/trainers/v1/invitation',
        invitationInfo
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

interface RegisterStudentCourseInfo {
  memberId: number;
  lessonCnt: number;
}

export const useRegisterStudentCourseMutation = () => {
  return useMutation<BaseResponse<null>, BaseError, RegisterStudentCourseInfo>({
    mutationFn: async (registerCourseInfo) => {
      const result = await authApi.post<BaseResponse<null>>(
        `/api/course/v1`,
        registerCourseInfo
      );
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
