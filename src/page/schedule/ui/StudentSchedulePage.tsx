'use client';

/* eslint-disable react/prop-types */
import 'react-day-picker/dist/style.css';
import './react-calendar.css';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useEffect, useState } from 'react';

import {
  ReservationBottomSheet,
  StandbyBottomSheet,
  useScheduleListQuery,
  useStudentMyReservationListQuery,
} from '@/feature/schedule';
import AlarmIcon from '@/shared/assets/images/icon_alarm.svg';
import DownIcon from '@/shared/assets/images/icon_arrow_bottom.svg';
import ScheduleIcon from '@/shared/assets/images/icon_schedule.svg';
import { Typography } from '@/shared/mixin';
import { Calendar } from '@/shared/ui';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Layout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
dayjs.extend(isBetween);
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DateFormatter, DayProps } from 'react-day-picker';

export const StudentSchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [isToggle, setIsToggle] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [scheduleListFormatDate, setScheduleListFormatDate] = useState(
    dayjs(date).format('YYYY-MM-DD')
  );
  const [myReservationFormatDate, setMyReservationFormatDate] = useState(
    dayjs(date).format('YYYYMM')
  );

  useEffect(() => {
    const dateFormattedWithHyphen = dayjs(date).format('YYYY-MM-DD');
    const dateFormattedWithoutHyphen = dayjs(date).format('YYYYMM');
    setScheduleListFormatDate(dateFormattedWithHyphen);
    setMyReservationFormatDate(dateFormattedWithoutHyphen);
  }, [date]);

  const { data: scheduleListData, isPending } =
    useScheduleListQuery(scheduleListFormatDate);
  const { data: myReservationData } = useStudentMyReservationListQuery(
    myReservationFormatDate
  );

  const reservedDates =
    myReservationData?.reservations?.map((item) => {
      return new Date(item.lessonDt);
    }) ?? [];

  const newStartOfWeek = new Date();
  const dayOfWeek = newStartOfWeek.getDay();
  const difference = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

  //실제 예약 가능한 날짜
  newStartOfWeek.setDate(newStartOfWeek.getDate());
  const newEndOfWeek = new Date(newStartOfWeek);
  newEndOfWeek.setDate(newStartOfWeek.getDate() + difference);

  //하단 화살표 클릭시 보여줘야 하는 날짜(일주일)
  const weekStart = dayjs(date).startOf('week');
  const weekEnd = dayjs(date).endOf('week');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modifiers = {
    hidden: (day: string | number | Date | dayjs.Dayjs | null | undefined) =>
      isToggle && !dayjs(day).isBetween(weekStart, weekEnd, null, '[]'),
  };

  const clickCalendarArrow = () => {
    if (date) {
      setHasMounted(true);
      setCurrentMonth(date);
      setIsToggle((prev) => !prev);
    }
  };

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };

  //예약한 날(블루닷)
  const reservedDay = (props: DayProps) => {
    const isreserved = reservedDates.some(
      (reservedDate) =>
        reservedDate.getDate() === props.date.getDate() &&
        reservedDate.getMonth() === props.date.getMonth()
    );

    return (
      <div className='day-cell'>
        {props.date.getDate()}
        {isreserved && <span className='reserved-indicator'></span>}
      </div>
    );
  };

  //상단 날짜 형식 변경
  const formatCaption: DateFormatter = (date, options) => {
    return (
      <>
        {`${format(date, 'yyyy', { locale: options?.locale })}년`}{' '}
        {format(date, 'LLLL', { locale: options?.locale })}
      </>
    );
  };

  return (
    <Layout type='student'>
      <Layout.Header className='flex justify-end bg-[#fff]'>
        <AlarmIcon />
      </Layout.Header>
      <Layout.Contents className='bg-gray-100'>
        <Tabs defaultValue='classReservation'>
          <TabsList className='grid w-full grid-cols-2 rounded-none border-b border-b-gray-200 bg-[#fff] p-0'>
            <TabsTrigger
              value='classReservation'
              className={cn(
                Typography.TITLE_1_BOLD,
                'h-[40px] rounded-none border-gray-800 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:text-gray-800 data-[state=active]:shadow-none'
              )}>
              수업 예약
            </TabsTrigger>
            <TabsTrigger
              value='myReservation'
              className={cn(
                Typography.TITLE_1_BOLD,
                'h-[40px] rounded-none border-gray-800 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:text-gray-800 data-[state=active]:shadow-none'
              )}
              onClick={() => {
                setHasMounted(false);
                setIsToggle(false);
              }}>
              나의 예약
            </TabsTrigger>
          </TabsList>
          <TabsContent value='classReservation' className='mt-0'>
            <article className='calendar-shadow rounded-bl-lg rounded-br-lg bg-[#fff] pt-1'>
              <div
                className={cn(
                  hasMounted
                    ? isToggle
                      ? 'animate-calendar-accordion-up fill-mode-forwards'
                      : 'animate-calendar-accordion-down fill-mode-forwards'
                    : '',
                  'overflow-hidden'
                )}>
                <Calendar
                  className='p-1'
                  mode='single'
                  required
                  selected={date}
                  onSelect={setDate}
                  fromDate={newStartOfWeek} //오늘날짜부터 나오게
                  toDate={newEndOfWeek}
                  month={currentMonth}
                  onDayClick={handleMonthChange}
                  onMonthChange={handleMonthChange}
                  weekStartsOn={0}
                  locale={ko}
                  formatters={{ formatCaption }}
                  modifiersStyles={{
                    hidden: { display: 'none' }, // 주간 표시할때 비활성화된 날짜 숨기기
                    today: { color: 'var(--primary-500)' },
                  }}
                  fixedWeeks={true}
                  modifiers={{ ...modifiers, reserved: reservedDates }}
                  components={{
                    DayContent: reservedDay, //예약한 날 표시(블루닷)
                  }}
                  isToggle={isToggle}
                />
              </div>
              <Button
                className={cn(isToggle ? '' : 'rotate-180', 'm-auto flex pb-7')}
                variant='ghost'
                onClick={clickCalendarArrow}>
                <DownIcon width={16} height={17} stroke={'var(--gray-600)'} />
              </Button>
            </article>

            {isPending ? (
              <p>로딩중...</p>
            ) : (
              <div className='p-7'>
                {scheduleListData?.morning !== null && (
                  <div className='mb-7'>
                    <p className={cn(Typography.BODY_1, 'mb-4 text-gray-700')}>오전</p>
                    <ul className='flex flex-wrap items-center justify-start gap-3'>
                      {scheduleListData?.morning
                        ?.filter((items) => items.reservationStatus !== 'NO_SHOW')
                        .map((item) => {
                          const [hours, minutes] = item.lessonStartTime?.split(':') || [
                            '00',
                            '00',
                          ];
                          return (
                            <li key={item.scheduleId}>
                              {item.reservationStatus === 'AVAILABLE' && date && (
                                <ReservationBottomSheet data={item} date={date} />
                              )}

                              {item.reservationStatus === 'COMPLETED' && date && (
                                <StandbyBottomSheet data={item} date={date} />
                              )}

                              {item.reservationStatus === 'SOLD_OUT' && (
                                <div
                                  className={cn(
                                    Typography.TITLE_3,
                                    'flex h-full w-[102px] flex-col items-center justify-center rounded-lg bg-gray-200 py-[15px] text-gray-400'
                                  )}>
                                  <span>{`${hours}:${minutes}`}</span>
                                  <span>마감</span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}

                {scheduleListData?.afternoon !== null && (
                  <div>
                    <p className={cn(Typography.BODY_1, 'mb-4 text-gray-700')}>오후</p>
                    <ul className='flex flex-wrap items-center justify-start gap-3'>
                      {scheduleListData?.afternoon
                        ?.filter((items) => items.reservationStatus !== 'NO_SHOW')
                        .map((item) => {
                          const [hours, minutes] = item.lessonStartTime?.split(':') || [
                            '00',
                            '00',
                          ];
                          return (
                            <li key={item.scheduleId}>
                              {item.reservationStatus === 'AVAILABLE' && date && (
                                <ReservationBottomSheet data={item} date={date} />
                              )}

                              {item.reservationStatus === 'COMPLETED' && date && (
                                <StandbyBottomSheet data={item} date={date} />
                              )}

                              {item.reservationStatus === 'SOLD_OUT' && (
                                <div
                                  className={cn(
                                    Typography.TITLE_3,
                                    'flex h-full w-[102px] flex-col items-center justify-center rounded-lg bg-gray-200 py-[15px] text-gray-400'
                                  )}>
                                  <span>{`${Number(hours) > 12 ? Number(hours) - 12 : 12}:${minutes}`}</span>
                                  <span>마감</span>
                                </div>
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}

                {scheduleListData?.morning === null &&
                  scheduleListData?.afternoon === null && (
                    <div className='flex flex-col items-center justify-center py-[70px]'>
                      <ScheduleIcon />
                      <p className={cn(Typography.TITLE_1, 'mt-4 text-gray-400')}>
                        예약 가능한 수업이 없습니다.
                      </p>
                    </div>
                  )}
              </div>
            )}
          </TabsContent>
          <TabsContent value='myReservation'>
            <div className='px-7 py-6'>
              <article
                className={cn(
                  'mb-8 flex items-center justify-between rounded-md bg-gray-200 px-6 py-3 text-gray-700',
                  Typography.TITLE_3
                )}>
                <p>잔여4회</p>
                <span className={cn(Typography.BODY_2)}>20회 PT수강권</span>
              </article>

              <Tabs defaultValue='upcomingReservation'>
                <TabsList className='mb-6 flex items-center justify-start gap-4 p-0'>
                  <TabsTrigger
                    value='upcomingReservation'
                    asChild
                    className='block h-full'>
                    <Button
                      variant='ghost'
                      className={cn(
                        Typography.HEADING_5,
                        'block w-[95px] rounded-[9999px] bg-[#fff] px-5 py-2 font-normal text-gray-500 shadow-none data-[state=active]:bg-primary-500 data-[state=active]:font-semibold data-[state=active]:text-[#fff]'
                      )}>
                      다가오는 예약
                    </Button>
                  </TabsTrigger>
                  <TabsTrigger
                    value='awaitingReservation'
                    asChild
                    className='block h-full'>
                    <Button
                      variant='ghost'
                      className={cn(
                        Typography.HEADING_5,
                        'block w-[95px] rounded-[9999px] bg-[#fff] px-5 py-2 font-normal text-gray-500 shadow-none data-[state=active]:bg-primary-500 data-[state=active]:font-semibold data-[state=active]:text-[#fff]'
                      )}>
                      대기중 예약
                    </Button>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='upcomingReservation' className='w-full'>
                  <ul>
                    <li className='mb-3'>
                      <Button variant='ghost' className='block h-full w-full p-0'>
                        <Card className='w-full text-left'>
                          <CardHeader>12월 13일 목요일</CardHeader>
                          <CardContent>오전 10:00 - 11:00</CardContent>
                        </Card>
                      </Button>
                    </li>
                    <li className='mb-3'>
                      <Button variant='ghost' className='block h-full w-full p-0'>
                        <Card className='w-full text-left'>
                          <CardHeader>12월 13일 목요일</CardHeader>
                          <CardContent>오전 10:00 - 11:00</CardContent>
                        </Card>
                      </Button>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};
