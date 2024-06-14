'use client';

import 'dayjs/locale/ko';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { AlarmType, useAlarmQuery } from '@/entity/alarm';
import { StudentAlarmItem } from '@/feature/alarm';
import { IconAlarmBig, IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const NoAlarm = () => {
  return (
    <li
      className={cn(
        Typography.TITLE_1_BOLD,
        'flex flex-col items-center justify-center py-28 text-gray-700'
      )}>
      <IconAlarmBig />
      <p className={cn(Typography.HEADING_4_BOLD, 'mt-6 text-gray-400')}>
        새로운 알림이 없습니다
      </p>
    </li>
  );
};

const ITEMS_PER_PAGE = 20;

const StudentAlarmPage = () => {
  const router = useRouter();
  const [tabState, setTabState] = useState<AlarmType>('SCHEDULE');
  const queryClient = useQueryClient();

  const { data, hasNextPage, fetchNextPage, isPending } = useAlarmQuery({
    type: tabState,
    size: ITEMS_PER_PAGE,
  });

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const handleValueChange = (value: string) => {
    if (value === 'SCHEDULE' || value === 'COMMUNITY') {
      setTabState(value);
    }
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['alarmList'] });
    };
  }, [queryClient]);

  return (
    <Layout>
      <Layout.Header className='relative bg-white'>
        <Button variant='ghost' className='p-0' onClick={() => router.back()}>
          <IconBack />
        </Button>
        <h2
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          알림
        </h2>
      </Layout.Header>
      <Layout.Contents className='bg-white'>
        <Tabs
          value={tabState}
          defaultValue='SCHEDULE'
          className='flex h-full w-full flex-col'
          onValueChange={(value) => handleValueChange(value)}>
          <TabsList>
            <TabsTrigger value='SCHEDULE' onClick={() => setTabState('SCHEDULE')}>
              <p className={cn(Typography.TITLE_1_BOLD, 'relative')}>
                <span
                  className={
                    data?.pages?.[0].redDotStatus?.[0].redDotStatus &&
                    data?.pages?.[0].redDotStatus?.[0].notificationCategory === 'SCHEDULE'
                      ? 't-0 absolute -right-2 ml-[2px] h-1 w-1 rounded-full bg-point'
                      : ''
                  }
                />
                수업
              </p>
            </TabsTrigger>
            <TabsTrigger
              value='COMMUNITY'
              className='relative'
              onClick={() => setTabState('COMMUNITY')}>
              <p className={cn(Typography.TITLE_1_BOLD, 'relative')}>
                커뮤니티
                <span
                  className={
                    data?.pages?.[0].redDotStatus?.[0].redDotStatus &&
                    data?.pages?.[0].redDotStatus?.[0].notificationCategory ===
                      'COMMUNITY'
                      ? 'absolute ml-[2px] h-1 w-1 rounded-full bg-point'
                      : ''
                  }
                />
              </p>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='SCHEDULE' className='mt-0 flex-grow'>
            {isPending && (
              <div className='flex h-[500px] w-full items-center justify-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
            {!isPending && (
              <ul>
                {data?.pages.map((item, index) => {
                  if (item.content === null || item.content.length === 0) {
                    return <NoAlarm key={`diet_${index}`} />;
                  }

                  return item.content.map((notification) => {
                    return (
                      <StudentAlarmItem
                        key={notification.notificationId}
                        data={notification}
                        sender={item.sender}
                      />
                    );
                  });
                })}
              </ul>
            )}

            {!data?.pages[data?.pages.length - 1].isLast && hasNextPage && (
              <div ref={ref} className='flex w-full justify-center p-3'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
          </TabsContent>
          <TabsContent value='COMMUNITY'>
            {isPending && (
              <div className='flex h-[500px] w-full items-center justify-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
            {!isPending && (
              <ul>
                {data?.pages.map((item, index) => {
                  if (item.content === null || item.content.length === 0) {
                    return <NoAlarm key={`diet_${index}`} />;
                  }

                  return item?.content?.map((notification) => {
                    return (
                      <StudentAlarmItem
                        key={notification.notificationId}
                        data={notification}
                        sender={item.sender}
                      />
                    );
                  });
                })}
              </ul>
            )}

            {!data?.pages[data?.pages.length - 1].isLast && hasNextPage && (
              <div ref={ref} className='flex w-full justify-center p-3'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};

export { StudentAlarmPage };
