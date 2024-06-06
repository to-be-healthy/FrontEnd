'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

import { useRouter, useSearchParams } from 'next/navigation';

import { IconArrowLeft, IconArrowRight, IconBack } from '@/shared/assets';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Calendar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn, getStartOfWeek } from '@/shared/utils';
import { Layout } from '@/widget';

import { DietFeedbackList } from './DietFeedbackList';
import { LessonFeedbackList } from './LessonFeedbackList';

const TrainerFeedbackPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams?.get('date') ?? dayjs().format('YYYY-MM-DD');
  const router = useRouter();

  const changeDate = (date: Date | string) => {
    setQueryString('date', dayjs(date).format('YYYY-MM-DD'));
  };

  // TODO) utils로 옮기기? 쿼리스트링 관리 hook 만들기?
  const setQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Layout className='bg-gray-100'>
      <Layout.Header className='relative bg-white'>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          피드백 작성
        </h1>
      </Layout.Header>
      <Layout.Contents className='flex flex-col overflow-hidden'>
        <div className='calendar-shadow relative rounded-bl-lg rounded-br-lg bg-white'>
          <Calendar
            mode='single'
            showOutsideDays={true}
            weekStartsOn={1}
            month={dayjs(date).toDate()}
            selected={dayjs(date).toDate()}
            onDayClick={(day) => changeDate(day)}
            className={cn('px-7 py-6')}
            classNames={{
              table: 'w-full',
              caption: 'pt-0',
              day_range_end: 'day-range-end',
              nav: 'hidden',
              nav_button: 'hidden',
              cell: 'p-0 relative [&:has([aria-selected])]:bg-primary-500 [&:has([aria-selected])]:text-[#fff] [&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
              day_today: 'text-primary-500',
              day_selected: 'bg-primary text-white',
            }}
            formatters={{
              formatCaption: () => {
                return `${dayjs(date).format('MMMM')} ${dayjs(date).week() - dayjs(date).startOf('month').week() + 1}주차`;
              },
            }}
            modifiersStyles={{
              hidden: { display: 'none' }, // 주간 표시할때 비활성화된 날짜 숨기기
            }}
            modifiers={{
              hidden: (day) => {
                const weekStart = dayjs(getStartOfWeek(date));
                const weekEnd = dayjs(weekStart).add(6, 'day');
                return !dayjs(day).isBetween(weekStart, weekEnd, null, '[]');
              },
            }}
          />
          <div className='absolute right-7 top-6 flex items-center gap-8 py-[3.5px]'>
            <button
              onClick={() => changeDate(dayjs(date).subtract(7, 'days').toDate())}
              className={cn(FLEX_CENTER, 'h-[16px] w-[16px]')}>
              <IconArrowLeft stroke={'#000'} />
            </button>
            <button
              onClick={() => changeDate(dayjs(date).add(7, 'days').toDate())}
              className={cn(FLEX_CENTER, 'h-[16px] w-[16px]')}>
              <IconArrowRight stroke={'#000'} />
            </button>
          </div>
        </div>
        <Tabs
          className='hide-scrollbar h-full gap-0 overflow-y-auto pb-0 pt-6'
          defaultValue='lesson'>
          <TabsList>
            <TabsTrigger value='lesson'>수업</TabsTrigger>
            <TabsTrigger value='diet'>식단</TabsTrigger>
          </TabsList>
          <TabsContent value='lesson' className='mt-0 px-7'>
            <LessonFeedbackList lessonDate={date} />
          </TabsContent>
          <TabsContent value='diet' className='mt-0 px-7'>
            <DietFeedbackList />
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerFeedbackPage };
