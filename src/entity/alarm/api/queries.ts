import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse, Pageable } from '@/shared/api';

import { AlarmData, AlarmType, SenderType } from '../model/types';

interface AlarmResponse extends Pageable {
  content: AlarmData[];
  redDotStatus: [
    {
      notificationCategory: AlarmType;
      redDotStatus: boolean;
    },
  ];
  sender: SenderType;
}

interface AlarmRequest {
  type: AlarmType;
  size: number;
}

export const useAlarmQuery = ({ type, size }: AlarmRequest) => {
  return useInfiniteQuery<AlarmResponse, BaseError>({
    queryKey: ['alarmList', type],
    queryFn: async ({ pageParam }) => {
      const result = await authApi.get<BaseResponse<AlarmResponse>>(
        `/api/notification/v1/${type}?page=${pageParam as number}&size=${size}`
      );
      return result.data.data;
    },
    initialPageParam: 0,

    getNextPageParam: (lastPage: AlarmResponse, allPages: AlarmResponse[]) => {
      return !lastPage.isLast ? allPages.length : undefined;
    },
  });
};

export const useHomeAlarmQuery = () => {
  return useQuery<boolean, BaseError>({
    queryKey: ['HomeAlarm'],
    queryFn: async () => {
      const res = await authApi.get<BaseResponse<boolean>>(
        `/api/notification/v1/red-dot`
      );
      return res.data.data;
    },
  });
};
