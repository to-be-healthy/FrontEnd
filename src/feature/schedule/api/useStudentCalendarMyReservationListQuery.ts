import { useQuery } from '@tanstack/react-query';

import { authApi } from '@/entity/auth';
import { BaseError, BaseResponse } from '@/shared/api';

interface CalendarMyReservationResponse {
  reservationDays: string[];
}
interface Props {
  lessonStartDt: string;
  lessonEndDt: string;
}
export const useStudentCalendarMyReservationListQuery = ({
  lessonStartDt,
  lessonEndDt,
}: Props) => {
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
