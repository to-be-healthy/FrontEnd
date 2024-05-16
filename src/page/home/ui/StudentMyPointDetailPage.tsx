'use client';

import 'dayjs/locale/ko';
dayjs.locale('ko');
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useMyPointHistoryQuery } from '@/feature/member/api/useMyPointHistoryQuery';
import { pointHistoryCodeDescription } from '@/feature/member/const';
import { IconClose, IconPoint } from '@/shared/assets';
import IconNotification from '@/shared/assets/images/icon_notification_transparent.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card, CardContent, CardHeader, Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';

const ITEMS_PER_PAGE = 20;

export const StudentMyPointDetailPage = () => {
  const queryClient = useQueryClient();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const {
    data: historyData,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useMyPointHistoryQuery(ITEMS_PER_PAGE);

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

  // todo : 포인트 없어도 데이터는 항상 있어야함 api수정예정
  const date = historyData?.pages[0]?.searchDate
    ? dayjs(historyData?.pages[0]?.searchDate).format('YYYY년 MM월')
    : '';

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
              <Button
                variant='ghost'
                className={cn(Typography.HEADING_5, 'mb-6 h-auto p-0 text-black')}>
                {date}
              </Button>
              <Card className='mb-6 w-full gap-y-1 bg-primary-500 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <p className={cn(Typography.HEADING_5, 'text-white')}>
                    {`${date?.split(' ')[1]} 활동 포인트`}
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
                <IconNotification className='rotate-180' />
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
                  <li key={`pointHistories_${index}`}>포인트 내역이 없습니다.</li>
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
