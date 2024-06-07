'use client';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Exercise, useTrainerWorkoutQuery } from '@/feature/workout';
import { IconAlertCircle, IconBack, IconChat, IconLike } from '@/shared/assets';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { ImageSlide, Layout, MonthPicker } from '@/widget';

const TrainerWorkoutPage = ({ memberId }: { memberId: number }) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const searchDate = dayjs(selectedMonth).format('YYYY-MM');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useTrainerWorkoutQuery(
    {
      memberId,
      searchDate,
    }
  );

  const name = data?.pages[0].mainData.name;

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
        <Link href={`/trainer/manage/${memberId}`}>
          <IconBack />
        </Link>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          {name && `${name}님 `}운동기록
        </h1>
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
                      const date = dayjs(workout.createdAt);
                      const formattedDate = date.format('M월 D일 (ddd)');

                      return (
                        <Link
                          key={workout.workoutHistoryId}
                          href={`/trainer/manage/${memberId}/workout/${workout.workoutHistoryId}`}>
                          <Card className={cn(Typography.TITLE_3, 'w-full gap-0')}>
                            <CardHeader className={cn(Typography.TITLE_3)}>
                              {formattedDate}
                            </CardHeader>
                            <CardContent className='mt-4'>
                              <ImageSlide images={workout.files} />
                              <p
                                className={cn(
                                  Typography.BODY_3,
                                  'mt-5 line-clamp-2 h-full overflow-ellipsis text-black'
                                )}>
                                {workout.content}
                              </p>

                              <ExercisePreview exercises={workout.completedExercises} />
                            </CardContent>
                            <CardFooter className='mt-6 flex gap-4'>
                              <div className=' flex items-center gap-2'>
                                {workout.liked ? (
                                  <IconLike
                                    stroke='var(--point-color)'
                                    fill='var(--point-color)'
                                  />
                                ) : (
                                  <IconLike stroke='var(--gray-500)' />
                                )}
                                <p
                                  className={cn(
                                    Typography.BODY_4_MEDIUM,
                                    'text-gray-500'
                                  )}>
                                  {workout.likeCnt}
                                </p>
                              </div>
                              <div className='flex items-center gap-2'>
                                <IconChat />
                                <p
                                  className={cn(
                                    Typography.BODY_4_MEDIUM,
                                    'text-gray-500'
                                  )}>
                                  댓글 <span>{workout.commentCnt}</span>
                                </p>
                              </div>
                            </CardFooter>
                          </Card>
                        </Link>
                      );
                    })}
                </div>
              ))}
            </div>
            <div ref={ref}>
              {isFetchingNextPage && (
                <div className={cn(FLEX_CENTER, 'w-full')}>
                  <Image src='/images/loading.gif' width={30} height={30} alt='loading' />
                </div>
              )}
            </div>
            {data.pages[0].content === null && <NoWorkout />}
          </div>
        )}
      </Layout.Contents>
    </Layout>
  );
};

const ExercisePreview = ({ exercises }: { exercises: Exercise[] }) => {
  const excercisesCount = exercises.length;
  const firstExercise = exercises[0];

  if (excercisesCount === 1) {
    const { name, weight, setNum, numberOfCycles } = firstExercise;
    return (
      <div className='mt-5 flex w-full justify-between rounded-md bg-gray-100 px-6 py-5'>
        <p className={cn(Typography.TITLE_3, 'text-black')}>{name}</p>
        <p className={cn(Typography.BODY_2, 'text-black')}>
          {`${weight}kg × ${setNum}회`}
          <span className='ml-2 text-primary-500'>{`${numberOfCycles}세트`}</span>
        </p>
      </div>
    );
  }

  if (excercisesCount > 1) {
    return (
      <div className='mt-5 w-full rounded-md bg-gray-100 px-6 py-5'>
        <p className={cn(Typography.TITLE_3, 'text-black')}>
          {`${firstExercise.name} 외 ${excercisesCount - 1}개`}
        </p>
      </div>
    );
  }
  return null;
};

const NoWorkout = () => {
  return (
    <div className={cn(FLEX_CENTER, 'h-full flex-col gap-4')}>
      <IconAlertCircle width={36} height={36} />
      <p className={cn(Typography.TITLE_1_BOLD, 'text-gray-700')}>
        등록된 운동 기록이 없습니다.
      </p>
    </div>
  );
};

export { TrainerWorkoutPage };
