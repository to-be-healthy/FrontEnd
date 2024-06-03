/* eslint-disable @next/next/no-img-element */
import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAuthSelector } from '@/entity/auth';
import { useDietListQuery } from '@/entity/diet';
import { MealType } from '@/feature/diet';
import {
  IconArrowLeft,
  IconChat,
  IconCheck,
  IconLike,
  IconNotification,
  IconPlus,
} from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardFooter, CardHeader } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

const dietDay: MealType[] = ['breakfast', 'lunch', 'dinner'];

const ITEMS_PER_PAGE = 10;

export const StudentDietListPage = () => {
  const today = new Date();
  const searchParams = useSearchParams();
  const month = searchParams.get('month');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { name } = useAuthSelector(['name']);

  const [selectedMonth, setSelectedMonth] = useState<Date>(dayjs(month).toDate());
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const { data, hasNextPage, fetchNextPage, isPending } = useDietListQuery({
    searchDate: dayjs(selectedMonth).format('YYYY-MM'),
    size: ITEMS_PER_PAGE,
  });

  const onChangeMonth = (month: Date) => {
    setSelectedMonth(month);
    const formattedMonth = dayjs(month).format('YYYY-MM');
    router.push(`/student/diet?month=${formattedMonth}`);
  };

  const onClickDiet = (dietId: number) => {
    router.push(`/student/diet/${dietId}/detail?month=${month}`);
  };

  useEffect(() => {
    if (month) {
      setSelectedMonth(dayjs(month).toDate());
    }
  }, [month]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['dietList'] });
    };
  }, [queryClient]);

  return isPending ? (
    <div>로딩중...</div>
  ) : (
    <Layout type='student'>
      <Layout.Header className='bg-gray-100'>
        <Link href='/student'>
          <IconArrowLeft stroke='black' />
        </Link>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-[$000]'
          )}>
          {name}님 식단
        </h2>
        <Link href='/student/diet/register'>
          <IconPlus width={20} height={20} />
        </Link>
      </Layout.Header>
      <Layout.Contents className='bg-gray-100'>
        <article className='bg-gray-100 px-7 pb-[52px] pt-7'>
          {selectedMonth && (
            <div className='flex justify-start'>
              <MonthPicker
                date={selectedMonth}
                onChangeDate={(newDate) => onChangeMonth(newDate)}
              />
            </div>
          )}

          <ul>
            {data?.pages.map((item, index) => {
              if (item.content === null || item.content.length === 0) {
                return (
                  <li
                    key={`diet_${index}`}
                    className={cn(
                      Typography.TITLE_1_BOLD,
                      'flex flex-col items-center justify-center py-28 text-gray-700'
                    )}>
                    <span className='mb-5 w-[35px]'>
                      <IconNotification width={33} height={33} stroke='var(--gray-300)' />
                    </span>
                    등록된 식단이 없습니다.
                  </li>
                );
              } else {
                return item.content.map((diet) => {
                  const date = dayjs(diet?.eatDate).format('MM월 DD일 (dd)');
                  const todayValue = dayjs(today).format('MM월 DD일 (dd)');
                  return (
                    <li key={diet.dietId}>
                      <Button
                        variant='ghost'
                        size='full'
                        className='p-0'
                        onClick={() => onClickDiet(diet.dietId)}>
                        <Card className='mb-5 w-full px-6 py-7'>
                          <CardHeader
                            className={
                              (Typography.TITLE_3, 'mb-4 text-left text-gray-600')
                            }>
                            {date === todayValue ? '오늘' : date}
                          </CardHeader>
                          <CardContent>
                            <article className='mb-6 flex justify-between'>
                              {dietDay.map((mealType: MealType) => {
                                const meal = diet[mealType];
                                return (
                                  <div
                                    key={mealType}
                                    className='flex w-[calc((100%-12px)/3)] items-center justify-center'>
                                    {meal.fast && (
                                      <div
                                        className={cn(
                                          Typography.TITLE_2,
                                          'flex h-[88px] w-full flex-col items-center justify-center rounded-md bg-gray-100 p-0 text-center text-gray-400'
                                        )}>
                                        <span className='mb-1'>
                                          <IconCheck fill={'var(--primary-500)'} />
                                        </span>
                                        단식
                                      </div>
                                    )}
                                    {!meal.fast && meal.dietFile?.fileUrl && (
                                      <div className='h-[88px] w-full'>
                                        <img
                                          src={meal.dietFile.fileUrl}
                                          alt='breakfast image'
                                          className='custom-image rounded-md'
                                        />
                                      </div>
                                    )}
                                    {!meal.fast && !meal.dietFile && (
                                      <div className='h-[88px] w-full rounded-md bg-gray-100 p-0' />
                                    )}
                                  </div>
                                );
                              })}
                            </article>

                            <CardFooter className='flex items-center justify-start'>
                              <div className='flex items-center'>
                                {diet.liked ? (
                                  <IconLike
                                    stroke='var(--point-color)'
                                    fill='var(--point-color)'
                                  />
                                ) : (
                                  <IconLike stroke='var(--gray-500)' />
                                )}
                                <span className='ml-1'>
                                  {diet.likeCnt ? diet.likeCnt : 0}
                                </span>
                              </div>
                              <div className='ml-4 flex items-center'>
                                <IconChat />
                                <p
                                  className={cn(
                                    Typography.BODY_4_MEDIUM,
                                    'ml-1 text-gray-500'
                                  )}>
                                  댓글
                                  <span className='ml-[2px]'>
                                    {diet.commentCnt ? diet.commentCnt : 0}
                                  </span>
                                </p>
                              </div>
                            </CardFooter>
                          </CardContent>
                        </Card>
                      </Button>
                    </li>
                  );
                });
              }
            })}
          </ul>

          {!data?.pages[data?.pages.length - 1].isLast && hasNextPage && (
            <div ref={ref} className='h-[20px] p-3 text-center'>
              loading...
            </div>
          )}
        </article>
      </Layout.Contents>
    </Layout>
  );
};
