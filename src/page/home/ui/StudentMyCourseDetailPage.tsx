'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { courseHistoryTypes, useMyCourseHistoryQuery } from '@/feature/member';
import { CourseCard, CourseCardContent, CourseCardHeader } from '@/feature/member';
import { IconClose, IconNotification } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

const ITEMS_PER_PAGE = 20;

export const StudentMyCourseDetailPage = () => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const queryClient = useQueryClient();

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const {
    data: historyData,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useMyCourseHistoryQuery({
    size: ITEMS_PER_PAGE,
    searchDate: dayjs(selectedMonth).format('YYYY-MM'),
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['myCourseHistory'] });
    };
  }, [queryClient]);

  return (
    <Layout type='student'>
      <Layout.Header className='justify-start bg-[#fff]'>
        <Link href='./'>
          <IconClose width={14} height={14} />
        </Link>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-[$000]'
          )}>
          내 수강권
        </h2>
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='flex h-full items-center justify-center'>
            <Image src='/images/loading.gif' width={30} height={30} alt='loading' />
          </div>
        ) : (
          <>
            <div className='bg-[#fff] p-7 pb-0 pt-6'>
              {historyData?.pages[0]?.mainData.course && (
                <CourseCard
                  expiration={
                    historyData?.pages[0].mainData.course.completedLessonCnt ===
                    historyData?.pages[0].mainData.course.totalLessonCnt
                  }>
                  <CourseCardHeader
                    gymName={historyData?.pages[0]?.mainData.gymName}
                    totalLessonCnt={
                      historyData?.pages[0]?.mainData.course?.totalLessonCnt
                    }
                    remainLessonCnt={
                      historyData?.pages[0]?.mainData.course?.remainLessonCnt
                    }
                    completedLessonCnt={
                      historyData?.pages[0]?.mainData.course?.completedLessonCnt
                    }
                  />
                  <CourseCardContent
                    totalLessonCnt={
                      historyData?.pages[0]?.mainData.course?.totalLessonCnt
                    }
                    completedLessonCnt={
                      historyData?.pages[0]?.mainData.course?.completedLessonCnt
                    }
                    progressClassName={cn(
                      historyData?.pages[0]?.mainData.course?.completedLessonCnt ===
                        historyData?.pages[0]?.mainData.course?.totalLessonCnt &&
                        'bg-gray-400'
                    )}
                  />
                </CourseCard>
              )}
              <div className='mt-7 flex justify-end'>
                <MonthPicker
                  date={selectedMonth}
                  onChangeDate={(newDate) => setSelectedMonth(newDate)}
                />
              </div>
            </div>

            <ul className='bg-gray-100'>
              {historyData?.pages?.map((data, index) => {
                if (data.content === null || data.content.length === 0) {
                  return (
                    <li
                      key={`courseHistories_${index}`}
                      className={cn(
                        Typography.TITLE_1_BOLD,
                        'flex flex-col items-center justify-center py-28 text-gray-700'
                      )}>
                      <span className='mb-5 w-[35px]'>
                        <IconNotification
                          width={33}
                          height={33}
                          stroke='var(--gray-300)'
                        />
                      </span>
                      수강권 내역이 없습니다.
                    </li>
                  );
                } else {
                  return data.content?.map((item) => {
                    const date = dayjs(item.createdAt);
                    const formattedDate = date.format('YY.MM.DD');

                    return (
                      <li className='px-7 py-8' key={item.courseHistoryId}>
                        <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                          {formattedDate}
                        </p>
                        <dl className='flex items-center justify-between'>
                          <dt className={cn(Typography.TITLE_3, 'text-gray-700')}>
                            {courseHistoryTypes[item.type]}
                          </dt>
                          <dd className={cn(Typography.TITLE_3, 'text-black')}>
                            {item.calculation === 'PLUS' ? '+' : '-'}
                            {item.cnt}
                          </dd>
                        </dl>
                      </li>
                    );
                  });
                }
              })}
            </ul>

            {!historyData?.pages[historyData?.pages.length - 1].isLast && hasNextPage && (
              <div ref={ref} className='flex items-center justify-center py-3'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
          </>
        )}
      </Layout.Contents>
    </Layout>
  );
};
