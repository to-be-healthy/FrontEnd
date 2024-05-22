'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { courseHistoryCodeDescription, useMyCourseHistoryQuery } from '@/feature/member';
import { CourseCard, CourseCardContent, CourseCardHeader } from '@/feature/member';
import { IconClose, IconNotification } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout, MonthPicker } from '@/widget';

const ITEMS_PER_PAGE = 20;

export const StudentMyCourseDetailPage = () => {
  const date = dayjs(new Date()).format('YYYY-MM');
  const [searchMonth, setSearchMonth] = useState<string>(date);
  const queryClient = useQueryClient();

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const {
    data: historyData,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useMyCourseHistoryQuery(ITEMS_PER_PAGE, searchMonth);

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
          <div className='loading'>Loading..</div>
        ) : (
          <>
            <div className='bg-[#fff] p-7 pb-0 pt-6'>
              {historyData?.pages[0]?.courseHistories && (
                <CourseCard
                  expiration={
                    historyData?.pages[0].course.completedLessonCnt ===
                    historyData?.pages[0].course.totalLessonCnt
                  }>
                  <CourseCardHeader
                    gymName={historyData?.pages[0]?.gymName}
                    totalLessonCnt={historyData?.pages[0]?.course?.totalLessonCnt}
                    remainLessonCnt={historyData?.pages[0]?.course?.remainLessonCnt}
                    completedLessonCnt={historyData?.pages[0]?.course?.completedLessonCnt}
                  />
                  <CourseCardContent
                    totalLessonCnt={historyData?.pages[0]?.course?.totalLessonCnt}
                    completedLessonCnt={historyData?.pages[0]?.course?.completedLessonCnt}
                    progressClassName={cn(
                      historyData?.pages[0]?.course?.completedLessonCnt ===
                        historyData?.pages[0]?.course?.totalLessonCnt && 'bg-gray-400'
                    )}
                  />
                </CourseCard>
              )}
              <div className='mt-7 flex justify-end'>
                <MonthPicker
                  date={searchMonth}
                  onChangeDate={(newDate) => setSearchMonth(newDate)}
                />
              </div>
            </div>
            <ul className='bg-gray-100'>
              {historyData?.pages?.map((data, index) => {
                return data.courseHistories !== null ? (
                  data.courseHistories?.map((item) => {
                    const date = dayjs(item.createdAt);
                    const formattedDate = date.format('YY.MM.DD');

                    return (
                      <li className='px-7 py-8' key={item.courseHistoryId}>
                        <p className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                          {formattedDate}
                        </p>
                        <dl className='flex items-center justify-between'>
                          <dt className={cn(Typography.TITLE_3, 'text-gray-700')}>
                            {courseHistoryCodeDescription[item.type]}
                          </dt>
                          <dd className={cn(Typography.TITLE_3, 'text-black')}>
                            {item.calculation === 'PLUS' ? '+' : '-'}
                            {item.cnt}
                          </dd>
                        </dl>
                      </li>
                    );
                  })
                ) : (
                  <li
                    key={`courseHistories${index}`}
                    className={cn(
                      Typography.TITLE_1_BOLD,
                      'flex flex-col items-center justify-center py-28 text-gray-700'
                    )}>
                    <span className='mb-5 w-[35px]'>
                      <IconNotification width={33} height={33} stroke='var(--gray-300)' />
                    </span>
                    수강권 내역이 없습니다.
                  </li>
                );
              })}
            </ul>
            {historyData?.pages[0].courseHistories !== null &&
              historyData?.pages[0].courseHistories.length === ITEMS_PER_PAGE &&
              hasNextPage && (
                <div ref={ref} className='h-[20px] p-3 text-center'>
                  loading...
                </div>
              )}
          </>
        )}
      </Layout.Contents>
    </Layout>
  );
};
