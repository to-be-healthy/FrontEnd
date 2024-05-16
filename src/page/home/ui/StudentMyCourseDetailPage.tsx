'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { courseHistoryCodeDescription, useMyCourseHistoryQuery } from '@/feature/member';
import { CourseCard, CourseCardContent, CourseCardHeader } from '@/feature/member';
import { IconClose } from '@/shared/assets';
import { Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';

const ITEMS_PER_PAGE = 20;

export const StudentMyCourseDetailPage = () => {
  const queryClient = useQueryClient();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const {
    data: historyData,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useMyCourseHistoryQuery(ITEMS_PER_PAGE);

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
      <Layout.Header className='relative flex justify-center bg-[#fff]'>
        <Link href='./' className='absolute left-7'>
          <IconClose width={20} height={20} />
        </Link>
        <h2>내 수강권</h2>
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='loading'>Loading..</div>
        ) : (
          <>
            <div className='bg-[#fff] p-7 pb-[58px] pt-6'>
              <CourseCard>
                <CourseCardHeader
                  gymName={historyData?.pages[0]?.gymName}
                  totalLessonCnt={historyData?.pages[0]?.course?.totalLessonCnt}
                  remainLessonCnt={historyData?.pages[0]?.course?.remainLessonCnt}
                  expiration={historyData?.pages[0]?.course?.remainLessonCnt === 0}
                />
                <CourseCardContent
                  totalLessonCnt={historyData?.pages[0]?.course?.totalLessonCnt ?? 0}
                  remainLessonCnt={historyData?.pages[0]?.course?.remainLessonCnt ?? 0}
                  progressClassName={cn(
                    historyData?.pages[0]?.course?.remainLessonCnt === 0 && 'bg-gray-400'
                  )}
                />
              </CourseCard>
            </div>
            <ul className='bg-gray-100'>
              {historyData?.pages?.map((data) => {
                return data.courseHistories?.map((item) => {
                  const date = dayjs(item.createdAt);
                  const formattedDate = date.format('YY.MM.DD');

                  return (
                    <li className='px-7 py-8' key={item.courseHistoryId}>
                      <p className='typography-body-4 text-gray-500'>{formattedDate}</p>
                      <dl className='flex items-center justify-between'>
                        <dt className='typography-title-3 text-gray-700'>
                          {courseHistoryCodeDescription[item.type]}
                        </dt>
                        <dd className='typography-title-3 text-black'>
                          {item.calculation === 'PLUS' ? '+' : '-'}
                          {item.cnt}
                        </dd>
                      </dl>
                    </li>
                  );
                });
              })}
            </ul>
            {historyData?.pages[0].courseHistories.length === ITEMS_PER_PAGE &&
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
