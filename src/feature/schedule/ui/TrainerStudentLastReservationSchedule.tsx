'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { IconCheck, IconNoSchedule } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  useToast,
} from '@/shared/ui';
import { cn, convertTo12HourFormat } from '@/shared/utils';

import { useTrainerChangeNoShowMutation } from '../api/useTrainerChangeNoShowMutation';
import { useTrainerChangeShowMutation } from '../api/useTrainerChangeShowMutation';
import { ScheduleData } from '../model/type';

const NoReservation = () => {
  return (
    <li
      className={cn(
        Typography.TITLE_1_BOLD,
        'flex flex-col items-center justify-center py-28 text-gray-400'
      )}>
      <span className='mb-5 w-[35px]'>
        <IconNoSchedule />
      </span>
      완료한 수업이 없습니다.
    </li>
  );
};

interface Props {
  data: ScheduleData | null;
}

export const TrainerStudentLastReservationSchedule = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { showErrorToast } = useShowErrorToast();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [lessonStartTime, period] = convertTo12HourFormat(
    data?.lessonStartTime ?? '00:00:00'
  );
  const [lessonEndTime] = convertTo12HourFormat(data?.lessonEndTime ?? '00:00:00');

  const reservatioDate = dayjs(data?.lessonDt).format('MM월 DD일 dddd');
  const reservatioDateInfo = dayjs(data?.lessonDt).format('MM.DD (dd)');

  const { mutate: noShowMutate } = useTrainerChangeNoShowMutation();
  const { mutate: cancelNoShowMutate } = useTrainerChangeShowMutation();

  const toggleNoShowStatus = (scheduleId: number, reservationStatus: string) => {
    if (reservationStatus === 'COMPLETED') {
      noShowMutate(scheduleId, {
        onSuccess: async ({ message }) => {
          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
              </div>
            ),
            duration: 2000,
          });
          setIsSheetOpen(false);
          await queryClient.refetchQueries({
            queryKey: ['TrainerStudentLastReservationList'],
          });
        },
        onError: (error) => {
          showErrorToast(error.response?.data.message ?? '에러가 발생했습니다');
        },
      });
    } else {
      cancelNoShowMutate(scheduleId, {
        onSuccess: async ({ message }) => {
          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
              </div>
            ),
            duration: 2000,
          });
          setIsSheetOpen(false);
          await queryClient.refetchQueries({
            queryKey: ['TrainerStudentLastReservationList'],
          });
        },
        onError: (error) => {
          showErrorToast(error.response?.data.message ?? '에러가 발생했습니다');
        },
      });
    }
  };

  if (!data) {
    return <NoReservation />;
  }

  return (
    data && (
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger className='w-full'>
          <Card className='mb-5 w-full px-6 py-7 text-left'>
            <CardHeader className={cn(Typography.TITLE_3, 'text-gray-600')}>
              {reservatioDate}
            </CardHeader>
            <CardContent className='flex items-center justify-start'>
              <p
                className={cn(
                  Typography.TITLE_1_BOLD,
                  'flex items-center justify-start text-black'
                )}>
                {period} {lessonStartTime} - {lessonEndTime}
              </p>

              <span
                className={cn(
                  Typography.BODY_4_MEDIUM,
                  data.reservationStatus === 'COMPLETED'
                    ? 'bg-[#e2f1ff] text-primary-500'
                    : 'bg-gray-100 text-gray-700',
                  'ml-2 w-[52px] rounded-sm py-[2px] text-center '
                )}>
                {data.reservationStatus === 'COMPLETED' ? '출석' : '미출석'}
              </span>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className='pt-7'>
          <SheetHeader className='mb-8 flex flex-row items-center justify-between'>
            <h3 className={cn(Typography.HEADING_4_BOLD, 'text-left text-black')}>
              수업 정보
            </h3>
          </SheetHeader>

          <SheetDescription
            className={cn(
              'mb-11 rounded-md bg-gray-100 p-6 text-center text-black',
              Typography.HEADING_3
            )}>
            {reservatioDateInfo} {period} {lessonStartTime} - {lessonEndTime}
            <span
              className={
                data.reservationStatus === 'COMPLETED' ? 'text-black' : 'text-point'
              }>
              {data.reservationStatus === 'COMPLETED' ? ' 출석' : ' 미출석'}
            </span>
          </SheetDescription>

          <SheetFooter className='flex flex-row justify-between gap-x-3'>
            <Button
              variant='default'
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'h-12 w-full rounded-md',
                data.reservationStatus === 'COMPLETED'
                  ? 'bg-gray-100 text-point'
                  : 'bg-[#E2F1FF] text-primary-500'
              )}
              onClick={() => toggleNoShowStatus(data.scheduleId, data.reservationStatus)}>
              {data.reservationStatus === 'COMPLETED' ? '미출석' : '출석'}
            </Button>
            <SheetClose
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'flex h-12 w-full items-center justify-center rounded-md bg-primary-500 text-white'
              )}>
              확인
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  );
};
