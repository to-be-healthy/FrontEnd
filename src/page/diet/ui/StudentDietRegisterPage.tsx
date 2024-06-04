/* eslint-disable react/prop-types */
import 'react-day-picker/dist/style.css';
import './react-calendar.css';

import { format } from 'date-fns';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DateFormatter, DayProps } from 'react-day-picker';

import {
  RegisterAndEditDiet,
  useDietShowNoticeMutation,
  useRegisterDietMutation,
  useStudentCalendarMyDietListQuery,
} from '@/entity/diet';
import {
  DailyDiet,
  defaultRequestData,
  DietContext,
  DietImageData,
  useDiet,
  useDietContext,
} from '@/feature/diet';
import { IconCheck, IconClose, IconNotification } from '@/shared/assets';
import DownIcon from '@/shared/assets/images/icon_arrow_bottom.svg';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, Calendar, Card, CardContent, CardHeader, useToast } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const DietRegisterProvider = () => {
  const dietContextValue = useDiet();

  return (
    <DietContext.Provider value={dietContextValue}>
      <StudentDietRegisterPage />
    </DietContext.Provider>
  );
};

export const StudentDietRegisterPage = () => {
  const { showErrorToast } = useShowErrorToast();

  const today = new Date();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { images, initialImages } = useDietContext();

  const [hasMounted, setHasMounted] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [isArrowToggle, setIsArrowToggle] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today);

  const { mutate: noticeMutate } = useDietShowNoticeMutation();
  const { data: calendarMyDietData, isPending: calendarIsPending } =
    useStudentCalendarMyDietListQuery({
      startDate: dayjs(currentMonth)
        .subtract(1, 'month')
        .startOf('month')
        .format('YYYY-MM-DD'),
      endDate: dayjs(currentMonth).add(1, 'month').endOf('month').format('YYYY-MM-DD'),
    });
  const { mutate: registerMutate, isPending: isRegisterPending } =
    useRegisterDietMutation();

  const month = dayjs(today).format('YYYY-MM');

  const dietDates =
    calendarMyDietData?.uploadDays?.map((item) => {
      return new Date(item);
    }) ?? [];

  // //식단 등록한 날(블루닷)
  const dietDay = (props: DayProps) => {
    const isDiet = dietDates?.some(
      (dietDate) =>
        dietDate.getDate() === props.date.getDate() &&
        dietDate.getMonth() === props.date.getMonth()
    );

    return (
      <div className='day-cell'>
        {props.date.getDate()}
        {isDiet && <span className='reserved-indicator'></span>}
      </div>
    );
  };

  // //하단 화살표 클릭시 보여줘야 하는 날짜(일주일)
  const weekStart = dayjs(date).startOf('week');
  const weekEnd = dayjs(date).endOf('week');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = {
    hidden: (day: string | number | Date | dayjs.Dayjs | null | undefined) =>
      isArrowToggle && !dayjs(day).isBetween(weekStart, weekEnd, null, '[]'),
    disabled: (day: Date) => {
      const isAfterToday = day > today;
      const isReservedDate =
        calendarMyDietData?.uploadDays?.some(
          (dietDate: string) =>
            dayjs(dietDate).toDate().getDate() === day.getDate() &&
            dayjs(dietDate).toDate().getMonth() === day.getMonth() &&
            dayjs(dietDate).toDate().getFullYear() === day.getFullYear()
        ) ?? false;
      return isAfterToday || isReservedDate;
    },
  };

  // //상단 날짜 형식 변경
  const formatCaption: DateFormatter = (date, options) => {
    return (
      <>
        {`${format(date, 'yyyy', { locale: options?.locale })}년`}{' '}
        {format(date, 'LLLL', { locale: options?.locale })}
      </>
    );
  };

  const clickCalendarArrow = () => {
    if (date) {
      setHasMounted(true);
      setCurrentMonth(date);
      setIsArrowToggle((prev) => !prev);
    }
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  const updateRequestData = (
    image: DietImageData
  ): Promise<Partial<RegisterAndEditDiet>> => {
    const isFile = image.fileUrl ? image.fileUrl : null;
    const isFast = image.fileUrl ? false : image.fast;
    return new Promise((resolve) => {
      if (image.type === 'breakfast') {
        const newData = { breakfastFile: isFile, breakfastFast: isFast };
        resolve(newData);
        return newData;
      } else if (image.type === 'lunch') {
        const newData = { lunchFile: isFile, lunchFast: isFast };
        resolve(newData);
        return newData;
      } else {
        const newData = { dinnerFile: isFile, dinnerFast: isFast };
        resolve(newData);
        return newData;
      }
    });
  };

  const onClickRegisterDiet = async () => {
    const updatedDataArray: Partial<RegisterAndEditDiet>[] = await Promise.all(
      images.map(updateRequestData)
    );

    const newRequestData = updatedDataArray.reduce(
      (acc: RegisterAndEditDiet, cur: Partial<RegisterAndEditDiet>) => {
        return { ...acc, ...cur };
      },
      defaultRequestData
    );

    if (JSON.stringify(newRequestData) !== JSON.stringify(defaultRequestData)) {
      registerMutate(
        { ...newRequestData, eatDate: dayjs(date).format('YYYY-MM-DD') },
        {
          onSuccess: async ({ message }) => {
            toast({
              className: 'h-12',
              description: (
                <div className='flex items-center justify-center'>
                  <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                  <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
                </div>
              ),
              duration: 2000,
            });

            await queryClient.refetchQueries({
              queryKey: ['studentCalendarMyDietList'],
            });

            setDate(undefined);
          },
          onError: (error) => {
            showErrorToast(error?.response?.data.message ?? 'error');
          },
        }
      );
    } else {
      showErrorToast('식단을 등록해주세요');
    }
  };

  const handleCloseNotification = () => {
    noticeMutate('DISABLE', {
      onSuccess: () => {
        void queryClient.refetchQueries({
          queryKey: ['studentCalendarMyDietList'],
        });
      },
    });
  };

  useEffect(() => {
    initialImages();
  }, [calendarMyDietData]);

  return (
    <Layout>
      <Layout.Header className='bg-white'>
        <Link href={`/student/diet?month=${month}`}>
          <IconClose />
        </Link>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-black'
          )}>
          식단 올리기
        </h2>
      </Layout.Header>
      <Layout.Contents>
        <article className='calendar-shadow rounded-bl-lg rounded-br-lg bg-[#fff]'>
          {calendarMyDietData?.dietNoticeStatus === 'ENABLED' && (
            <div className='flex items-center justify-between bg-blue-50 px-7 py-5'>
              <div className='flex items-center justify-center'>
                <IconNotification width={12} height={12} stroke='black' />
                <p className={cn(Typography.BODY_3, 'ml-3 text-black')}>
                  식단을 등록하지 않은 지난 날짜만 업로드 가능합니다.
                </p>
              </div>
              <Button
                variant='ghost'
                className='h-auto p-0'
                onClick={handleCloseNotification}>
                <IconClose />
                {/* <IconClose width={12} height={12} /> TODO: 추후변경*/}
              </Button>
            </div>
          )}

          {calendarIsPending ? (
            <div className='h-[364px] w-full px-7 pb-6 pt-8'>로딩중...</div>
          ) : (
            <div
              className={cn(
                hasMounted
                  ? isArrowToggle
                    ? 'animate-calendar-accordion-up fill-mode-forwards'
                    : 'animate-calendar-accordion-down fill-mode-forwards'
                  : '',
                'overflow-hidden px-7 pb-6 pt-8'
              )}>
              <Calendar
                mode='single'
                required
                selected={date}
                onSelect={setDate}
                toDate={today}
                month={currentMonth}
                onDayClick={handleMonthChange}
                onMonthChange={handleMonthChange}
                formatters={{ formatCaption }}
                modifiersStyles={{
                  hidden: { display: 'none' }, // 주간 표시할때 비활성화된 날짜 숨기기
                }}
                fixedWeeks={true}
                modifiers={{
                  ...modifiers,
                  reserved: dietDates,
                }}
                components={{
                  DayContent: dietDay, //예약한 날 표시(블루닷)
                }}
                isToggle={isArrowToggle}
              />
            </div>
          )}

          <Button
            className={cn(isArrowToggle ? '' : 'rotate-180', 'm-auto flex pb-7')}
            variant='ghost'
            onClick={clickCalendarArrow}>
            <DownIcon width={16} height={17} stroke={'var(--gray-600)'} />
          </Button>
        </article>

        <div className='flex flex-col justify-between px-7 pb-8 pt-6'>
          {images && date && (
            <Card className='w-full'>
              <CardHeader className={(Typography.TITLE_3, 'mb-4 text-gray-600')}>
                {dayjs(date).format('MM월 DD일 (dd)')}
              </CardHeader>
              <CardContent>
                <article className='flex items-center justify-between'>
                  {images.map((diet) => {
                    return <DailyDiet key={diet.type} diet={diet} />;
                  })}
                </article>
              </CardContent>
            </Card>
          )}
        </div>
      </Layout.Contents>
      <Layout.BottomArea className='px-7 pb-10 pt-7'>
        <Button
          size='full'
          onClick={onClickRegisterDiet}
          disabled={isRegisterPending}
          className={cn(Typography.TITLE_1_BOLD, 'text-white')}>
          {isRegisterPending ? '로딩중...' : '등록 완료'}
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};
