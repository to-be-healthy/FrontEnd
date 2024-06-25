'use client';

import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(isBetween);
dayjs.extend(weekOfYear);

import { useRouter } from 'next/navigation';

import { IconArrowLeft, IconArrowRight, IconBack } from '@/shared/assets';
import { useQueryString } from '@/shared/hooks';
import { FLEX_CENTER, HEADER_TITLE_CENTER, Typography } from '@/shared/mixin';
import { Calendar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn, getStartOfWeek } from '@/shared/utils';
import { Layout } from '@/widget';

import { DietFeedbackList } from './DietFeedbackList';
import { LessonFeedbackList } from './LessonFeedbackList';

const TrainerFeedbackPage = () => {
  const router = useRouter();
  const { getQueryString, setQueryString } = useQueryString();
  const date = getQueryString('date') ?? dayjs().format('YYYY-MM-DD');

  const changeDate = (date: Date | string) => {
    if (dayjs(date).isAfter(dayjs(), 'day')) return;
    setQueryString('date', dayjs(date).format('YYYY-MM-DD'));
  };

  const weekStart = dayjs(getStartOfWeek(date));
  const weekEnd = dayjs(weekStart).add(6, 'day');

  const rightButtonDiabled = dayjs(weekEnd).add(1, 'days').isAfter(dayjs(), 'day');

  return (
    <Layout className='bg-gray-100'>
      <Layout.Header className='relative bg-white'>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD, HEADER_TITLE_CENTER)}>
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
              cell: 'p-0 relative [&:has([aria-selected])]:bg-primary-500 [&:has([aria-selected])]:text-white [&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20',
              day_today: 'text-primary-500',
              day_selected: 'bg-primary text-white',
            }}
            formatters={{
              formatCaption: () => {
                return `${dayjs(date).format('MMMM')}`;
              },
            }}
            modifiersStyles={{
              hidden: { display: 'none' },
              future: { color: 'var(--gray-400)' },
            }}
            modifiers={{
              hidden: (day) => {
                return !dayjs(day).isBetween(weekStart, weekEnd, null, '[]');
              },
              future: (day) => dayjs(day).isAfter(dayjs()),
            }}
          />
          <div className='absolute right-7 top-6 flex items-center gap-8 py-[3.5px]'>
            <button
              onClick={() => changeDate(dayjs(date).subtract(7, 'days').toDate())}
              className={cn(FLEX_CENTER, 'h-6 w-6')}>
              <IconArrowLeft stroke={'#000'} />
            </button>
            <button
              onClick={() => changeDate(dayjs(date).add(7, 'days').toDate())}
              className={cn(FLEX_CENTER, 'h-6 w-6')}
              disabled={rightButtonDiabled}>
              <IconArrowRight stroke={rightButtonDiabled ? 'var(--gray-400)' : '#000'} />
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
          <TabsContent value='lesson' className='mt-0 px-7 py-6'>
            <LessonFeedbackList lessonDate={date} />
          </TabsContent>
          <TabsContent value='diet' className='mt-0 px-7 py-6'>
            <DietFeedbackList dietDate={date} />
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerFeedbackPage };
