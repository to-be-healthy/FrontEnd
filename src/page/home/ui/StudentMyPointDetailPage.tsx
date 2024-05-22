'use client';

import 'dayjs/locale/ko';

import dayjs from 'dayjs';
dayjs.locale('ko');
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useMyPointHistoryQuery } from '@/feature/member/api/useMyPointHistoryQuery';
import { pointHistoryCodeDescription } from '@/feature/member/const';
import { IconClose, IconNotification, IconPoint } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent, CardHeader, Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { MonthPicker } from '@/widget/month-picker';

const ITEMS_PER_PAGE = 20;

export const StudentMyPointDetailPage = () => {
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
  } = useMyPointHistoryQuery(ITEMS_PER_PAGE, searchMonth);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['myPointHistory'] });
    };
  }, [queryClient]);

  const month = dayjs(historyData?.pages[0]?.searchDate).format('MM').split('')[1];

  return (
    <Layout type='student'>
      <Layout.Header className='justify-start bg-[#fff]'>
        <Link href='./' className='h-full w-full'>
          <IconClose width={14} height={14} />
        </Link>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 translate-x-[-50%] text-[$000]'
          )}>
          포인트
        </h2>
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='loading'>Loading..</div>
        ) : (
          <>
            <div className='bg-[#fff] p-7 pb-[36px] pt-6'>
              <MonthPicker
                date={searchMonth}
                onChangeDate={(newDate) => setSearchMonth(newDate)}
              />
              <Card className='mb-6 w-full gap-y-1 bg-primary-500 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <p className={cn(Typography.HEADING_5, 'text-white')}>
                    {`${month}월 활동 포인트`}
                  </p>

                  <div className='flex items-center justify-between'>
                    <IconPoint />
                    <span className={cn(Typography.HEADING_4, 'ml-1 text-white')}>
                      {historyData?.pages[0].monthPoint}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className='flex items-center justify-between'>
                    <dt className={cn(Typography.BODY_4_MEDIUM, 'text-blue-100')}>
                      누적
                    </dt>
                    <dd className={cn(Typography.BODY_3, 'text-white')}>
                      {historyData?.pages[0].totalPoint}
                    </dd>
                  </dl>
                </CardContent>
              </Card>
              <p className={cn(Typography.BODY_4, 'flex items-center justify-start')}>
                <IconNotification width={12} height={12} stroke='black' />
                <span className='ml-1'>활동 포인트는 매월 1일 자정 초기화됩니다.</span>
              </p>
            </div>

            <ul className='bg-gray-100'>
              {historyData?.pages?.map((data, index) => {
                return data.pointHistories !== null ? (
                  data.pointHistories?.map((item) => {
                    const date = dayjs(item?.createdAt);
                    const formattedDate = date.format('YY.MM.DD');

                    return (
                      <li className='px-7 py-8' key={item.pointId}>
                        <p className='typography-body-4 text-gray-500'>{formattedDate}</p>
                        <dl className='flex items-center justify-between'>
                          <dt className='typography-title-3 text-gray-700'>
                            {pointHistoryCodeDescription[item.type]}
                          </dt>
                          <dd className='typography-title-3 text-black'>
                            {item.calculation === 'PLUS' ? '+' : '-'}
                            {item.point}
                          </dd>
                        </dl>
                      </li>
                    );
                  })
                ) : (
                  <li
                    key={`pointHistories_${index}`}
                    className={cn(
                      Typography.TITLE_1_BOLD,
                      'flex flex-col items-center justify-center py-28 text-gray-700'
                    )}>
                    <span className='mb-5 w-[35px]'>
                      <IconNotification width={33} height={33} stroke='var(--gray-300)' />
                    </span>
                    포인트 내역이 없습니다.
                  </li>
                );
              })}
            </ul>
            {historyData?.pages[0].pointHistories !== null &&
              historyData?.pages[0].pointHistories.length === ITEMS_PER_PAGE &&
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
