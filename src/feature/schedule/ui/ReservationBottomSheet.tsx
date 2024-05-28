'use client';

import 'dayjs/locale/ko';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import { IconCheck, IconError } from '@/shared/assets';
import CancelCalendarIcon from '@/shared/assets/images/icon_cancel_calendar.svg';
import ReservationCalendarIcon from '@/shared/assets/images/icon_reservation_calendar.svg';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

import { useStudentReservationScheduleMutation } from '../api/useStudentReservationScheduleMutation';
import { AllScheduleData } from '../model/type';

dayjs.locale('ko');

interface Props {
  data: AllScheduleData;
  date: Date;
}

export const ReservationBottomSheet = ({ data, date }: Props) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [startHours, startMinutes] = data?.lessonStartTime?.split(':') || ['00', '00'];
  const [endHours, endMinutes] = data?.lessonEndTime?.split(':') || ['00', '00'];

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useStudentReservationScheduleMutation();

  const modifiedTime = dayjs(`${data.lessonDt} ${data.lessonStartTime}`)
    .subtract(30, 'minute')
    .format('HH:mm');
  const [reservationHours, reservationMinutes] = modifiedTime.split(':');

  const selectDate = dayjs(date).format('MM.DD(dd)');
  const previousDate = dayjs(date).subtract(1, 'day').format('MM.DD(dd)');

  const handleReservationSchedule = (scheduleId: number) => {
    mutate(scheduleId, {
      onSuccess: ({ message }) => {
        setIsSheetOpen(false);
        void queryClient.invalidateQueries({
          queryKey: ['scheduleList'],
        });
        void queryClient.invalidateQueries({
          queryKey: ['StudentCalendarMyReservationList'],
        });
        void queryClient.invalidateQueries({
          queryKey: ['StudentMyReservationList'],
        });
        toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <IconCheck fill={'var(--primary-500)'} />
              <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
            </div>
          ),
          duration: 2000,
        });
      },
      onError: (error) => {
        toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <IconError fill={'var(--primary-500)'} />
              <p className='typography-heading-5 ml-6 text-[#fff]'>
                {error.response?.data.message}
              </p>
            </div>
          ),
          duration: 2000,
        });
      },
    });
  };

  const convertTo12HourFormat = (hour: number) => {
    return hour > 12 ? hour - 12 : hour;
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='h-full w-[102px] flex-col bg-[#fff] py-[15px]'>
          <span>{`${convertTo12HourFormat(Number(startHours))}:${startMinutes}`}</span>
          <span className={cn(Typography.TITLE_3, 'block text-[#3BA0FF]')}>예약하기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='bottom' headerType='thumb'>
        <SheetHeader className='mb-8 text-left'>
          <h2 className={cn(Typography.HEADING_4_BOLD, 'mb-2 text-black')}>
            이 수업을 예약할까요?
          </h2>
          <p className={cn(Typography.TITLE_2, 'text-gray-600')}>
            무단결석이나 24시간 내 예약을 취소하지 못한 경우 수강권에서 잔여 횟수가 자동
            차감됩니다.
          </p>
        </SheetHeader>
        <div>
          <div
            className={cn(
              'mb-7 rounded-md bg-gray-100 p-6 text-center text-black',
              Typography.HEADING_3
            )}>
            {selectDate} {Number(startHours) < 12 ? '오전 ' : '오후 '}
            {`${convertTo12HourFormat(Number(startHours))}:${startMinutes}`}-
            {`${convertTo12HourFormat(Number(endHours))}:${endMinutes}`}
          </div>

          <div className='mb-11'>
            <dl className='mb-2 flex items-center justify-between'>
              <dt className='flex items-center justify-between'>
                <ReservationCalendarIcon />
                <span className={cn('ml-2 text-gray-600', Typography.TITLE_1_SEMIBOLD)}>
                  예약
                </span>
              </dt>
              <dd className={cn(Typography.BODY_1, 'text-gray-600')}>
                {selectDate} {Number(reservationHours) < 12 ? '오전' : '오후'}{' '}
                {convertTo12HourFormat(Number(reservationHours))}:{reservationMinutes}{' '}
                까지
              </dd>
            </dl>
            <dl className='mb-2 flex items-center justify-between'>
              <dt className='flex items-center justify-between'>
                <CancelCalendarIcon />
                <span className={cn('ml-2 text-gray-600', Typography.TITLE_1_SEMIBOLD)}>
                  취소
                </span>
              </dt>
              <dd className={cn(Typography.BODY_1, 'text-gray-600')}>
                {previousDate} {Number(startHours) < 12 ? '오전' : '오후'}{' '}
                {convertTo12HourFormat(Number(startHours))}:{startMinutes} 까지
              </dd>
            </dl>
          </div>
        </div>
        <SheetFooter className='flex flex-row items-center justify-center gap-3'>
          <SheetClose
            className={cn(
              'h-[48px] w-full rounded-md bg-gray-100 text-gray-600',
              Typography.TITLE_1_SEMIBOLD
            )}>
            아니요
          </SheetClose>
          <Button
            className={cn('h-[48px] w-full rounded-md', Typography.TITLE_1_SEMIBOLD)}
            onClick={() => handleReservationSchedule(data.scheduleId)}>
            예약하기
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
