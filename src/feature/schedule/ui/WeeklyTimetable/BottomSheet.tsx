import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  IconCalendarCancel,
  IconCalendarCheck,
  IconCameraNegative,
  IconCameraPositive,
  IconDocumentProfile,
} from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, DialogClose, DialogContent, SheetContent } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useEnableScheduleMutation } from '../../api/useEnableScheduleMutation';
import { useTrainerCancelReservationScheduleMutation } from '../../api/useTrainerCancelReservationScheduleMutation';
import { FlatSchedule } from '../../model/type';

const BottomSheet = ({ schedule }: { schedule: FlatSchedule }) => {
  return sheetMapper(schedule)[schedule.reservationStatus];
};

const sheetMapper = (schedule: FlatSchedule) => ({
  COMPLETED: <CompletedSheet schedule={schedule} />,
  SOLD_OUT: <CompletedSheet schedule={schedule} />,
  AVAILABLE: <AvailableSheet schedule={schedule} />,
  NO_SHOW: <NoShowSheet schedule={schedule} />,
  DISABLED: <DisabledSheet schedule={schedule} />,
  LUNCH_TIME: <DisabledSheet schedule={schedule} />,
});

const CompletedSheet = ({ schedule }: { schedule: FlatSchedule }) => {
  const { mutate } = useTrainerCancelReservationScheduleMutation();
  const { showErrorToast } = useShowErrorToast();

  const queryClient = useQueryClient();

  const { date, scheduleId, applicantId } = schedule;
  const title = `${dayjs(date).format('M.DD(ddd) A')} ${schedule.lessonStartTime} ~ ${schedule.lessonEndTime}`;

  const [confirm, setConfirm] = useState(false);

  const cancelReservation = () => {
    mutate(scheduleId, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['schedule'].filter(Boolean),
        });
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  useEffect(() => {
    setConfirm(false);
  }, [schedule]);

  if (confirm) {
    return (
      <DialogContent className='flex w-[320px] flex-col rounded-md bg-white p-7 text-center'>
        <h3 className={cn(Typography.TITLE_1_SEMIBOLD)}>수업을 취소하시겠습니까?</h3>
        <div className='mt-8 flex gap-3'>
          <DialogClose className='w-full rounded-md bg-gray-100 py-[13px] text-gray-600'>
            아니요
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant='default'
              size={'full'}
              onClick={cancelReservation}
              className='py-[13px]'>
              예
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    );
  }

  return (
    <SheetContent side='bottom'>
      <div className='flex w-full flex-col'>
        <h3 className={cn(Typography.HEADING_3)}>{schedule.applicantName}</h3>
        <p className={cn(Typography.BODY_1, 'mt-2')}>{title}</p>
        <div className={cn('mt-7 flex w-full justify-center gap-6')}>
          <button
            className={cn(
              Typography.TITLE_1_SEMIBOLD,
              'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
            )}
            onClick={() => setConfirm(true)}>
            <IconCalendarCancel />
            수업 취소하기
          </button>
          <Link
            href={`/trainer/manage/${applicantId}`}
            className={cn(
              Typography.TITLE_1_SEMIBOLD,
              'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
            )}>
            <IconDocumentProfile />
            회원 정보 보기
          </Link>
        </div>
      </div>
    </SheetContent>
  );
};

const AvailableSheet = ({ schedule }: { schedule: FlatSchedule }) => {
  const { showErrorToast } = useShowErrorToast();
  const { mutate } = useTrainerCancelReservationScheduleMutation();
  const queryClient = useQueryClient();

  const { date, scheduleId } = schedule;

  const title = `${dayjs(date).format('M.DD(ddd) A')} ${schedule.lessonStartTime} ~ ${schedule.lessonEndTime}`;

  const cancelReservation = () => {
    mutate(scheduleId, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['schedule'].filter(Boolean),
        });
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  return (
    <SheetContent side='bottom'>
      <div className='flex w-full flex-col'>
        <h3 className={cn(Typography.HEADING_3)}>{title}</h3>
        <div className={cn('mt-7 flex w-full justify-center gap-6')}>
          <Link
            href={`/trainer/schedule/select?scheduleId=${scheduleId}`}
            className={cn(
              Typography.TITLE_1_SEMIBOLD,
              'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
            )}>
            <IconCameraPositive />
            수업 추가하기
          </Link>
          <DialogClose asChild>
            <button
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
              )}
              onClick={cancelReservation}>
              <IconCameraNegative />
              예약 불가로 변경
            </button>
          </DialogClose>
        </div>
      </div>
    </SheetContent>
  );
};

const NoShowSheet = ({ schedule }: { schedule: FlatSchedule }) => {
  const date = schedule.date;
  const title = `${dayjs(date).format('M.DD(ddd) A')} ${schedule.lessonStartTime} ~ ${schedule.lessonEndTime}`;

  return (
    <SheetContent side='bottom'>
      <div className='flex w-full flex-col'>
        <h3 className={cn(Typography.HEADING_3)}>{title}</h3>
        <div className={cn('mt-7 flex w-full justify-center gap-6')}>No Show</div>
      </div>
    </SheetContent>
  );
};

const DisabledSheet = ({ schedule }: { schedule: FlatSchedule }) => {
  const { showErrorToast } = useShowErrorToast();
  const { mutate } = useEnableScheduleMutation();
  const queryClient = useQueryClient();

  const { date, lessonStartTime, lessonEndTime } = schedule;
  const title = `${dayjs(date).format('M.DD(ddd) A')} ${schedule.lessonStartTime} ~ ${schedule.lessonEndTime}`;

  const enabledSchedule = () => {
    const payload = {
      lessonDt: date,
      lessonStartTime,
      lessonEndTime,
    };

    mutate(payload, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['schedule'].filter(Boolean),
        });
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  return (
    <SheetContent side='bottom'>
      <div className='flex w-full flex-col'>
        <h3 className={cn(Typography.HEADING_3)}>{title}</h3>
        <p className={cn(Typography.BODY_1, 'mt-2 text-point')}>예약불가</p>
        <div className={cn('mt-7 flex w-full justify-center gap-6')}>
          <DialogClose
            className={cn(
              Typography.TITLE_1_SEMIBOLD,
              'flex h-[120px] w-[120px] flex-col items-center justify-center gap-5 rounded-lg border border-gray-200'
            )}
            onClick={enabledSchedule}>
            <IconCalendarCheck />
            수업 운영하기
          </DialogClose>
        </div>
      </div>
    </SheetContent>
  );
};

export { BottomSheet };
