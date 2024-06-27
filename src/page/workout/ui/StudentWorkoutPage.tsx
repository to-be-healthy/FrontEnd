'use client';

import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAuthSelector } from '@/entity/auth';
import { NoWorkout, useWorkoutQuery, WorkoutPost } from '@/feature/workout';
import { IconArrowLeft, IconPlus } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

const StudentWorkoutPage = () => {
  const router = useRouter();
  const { name, memberId } = useAuthSelector(['name', 'memberId']);

  if (!name || !memberId) {
    throw new Error();
  }

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const searchDate = dayjs(selectedMonth).format('YYYY-MM');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useWorkoutQuery({
    memberId,
    searchDate,
  });

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <Layout>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconArrowLeft stroke='black' />
        </button>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 -translate-x-1/2'
          )}>
          {name}님 운동기록
        </h1>
        <Link href={'/student/workout/create'}>
          <IconPlus width={20} height={20} fill='black' />
        </Link>
      </Layout.Header>
      <Layout.Contents className='flex flex-col flex-wrap py-7'>
        <MonthPicker
          date={selectedMonth}
          onChangeDate={(newDate) => setSelectedMonth(newDate)}
          className='px-7'
        />
        {data && (
          <div className='hide-scrollbar mt-1 flex h-full flex-1 flex-grow flex-col overflow-y-auto px-7 pb-7'>
            <div>
              {data.pages.map((page, pageIndex) => (
                <div key={pageIndex} className='flex w-full flex-col gap-y-6 pb-6'>
                  {page.content &&
                    page.content.length > 0 &&
                    page.content.map((workout) => {
                      return (
                        <Link
                          key={workout.workoutHistoryId}
                          href={`/student/workout/${workout.workoutHistoryId}`}>
                          <WorkoutPost workout={workout} />
                        </Link>
                      );
                    })}
                </div>
              ))}
            </div>
            {isFetchingNextPage && (
              <div ref={ref} className='h-7 p-3 text-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
            {data.pages[0].content === null && <NoWorkout />}
          </div>
        )}
      </Layout.Contents>
    </Layout>
  );
};

export { StudentWorkoutPage };
