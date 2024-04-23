'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { courseHistoryCodeDescription, useMyCourseHistoryQuery } from '@/feature/member';
import { CourseCard, CourseCardContent, CourseCardHeader } from '@/feature/member';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { Layout } from '@/shared/ui';

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
          <CloseIcon />
        </Link>
        <h2>내 수강권</h2>
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='loading'>Loading..</div>
        ) : (
          <>
            <div className='bg-[#fff] p-7 pb-[58px] pt-6'>
              <CourseCard key={historyData?.pages[0]?.course?.courseId}>
                <CourseCardHeader
                  gymName='건강해짐 홍대점'
                  remainLessonCnt={historyData?.pages[0]?.course?.remainLessonCnt}
                />
                <CourseCardContent
                  totalLessonCnt={historyData?.pages[0]?.course?.totalLessonCnt ?? 0}
                  remainLessonCnt={historyData?.pages[0]?.course?.remainLessonCnt ?? 0}
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
                        <dd className='typography-title-3 text-[#000]'>
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
