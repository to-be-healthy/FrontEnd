'use client';

import 'dayjs/locale/ko';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IconAlarmBig, IconBack } from '@/shared/assets';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { cn, formatTimestampToRelativeTime } from '@/shared/utils';
import { Layout } from '@/widget';

const MOCK_DATA_LESSON = [
  {
    notification_id: 1,
    is_read: false,
    type: 'lesson',
    content: '박지윤님이 4월 3일 3시 예약 신청을 보냈어요!',
    timestamp: '2024-05-28 21:29:12',
    sender_profile_image: '/icon-192x192.png',
    sender_name: 'server',
    schedule_id: 13,
  },
  {
    notification_id: 0,
    is_read: true,
    type: 'lesson',
    content: '박지윤님이 4월 3일 3시 예약 신청을 보냈어요!',
    timestamp: '2024-05-28 19:00:12',
    sender_profile_image: '/icon-192x192.png',
    sender_name: 'server',
    schedule_id: 11,
  },
];

const TrainerAlarmPage = () => {
  const router = useRouter();
  const [tabState, setTabState] = useState('lesson');

  // TODO) 알림 목록 조회 API 개발 이후에 Query, type 등 반영 예정
  const [data, setData] = useState(MOCK_DATA_LESSON);

  const handleCheckAlarm = (alarm: (typeof data)[number]) => {
    changeReadState(alarm.notification_id);

    // navigate somewhere
  };

  // TODO) 알림 읽은 상태 전환 API 호출 예정
  const changeReadState = (notification_id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.notification_id === notification_id ? { ...item, is_read: true } : item
      )
    );
  };

  useEffect(() => {
    setData(MOCK_DATA_LESSON);
  }, []);

  return (
    <Layout>
      <Layout.Header className='relative'>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 my-auto -translate-x-1/2'
          )}>
          알림
        </h1>
      </Layout.Header>
      <Layout.Contents className='mt-6'>
        <Tabs
          value={tabState}
          defaultValue='lesson'
          className='flex h-full w-full flex-col'
          onValueChange={(value) => setTabState(value)}>
          <TabsList className='flex w-full px-7'>
            <TabsTrigger
              value='lesson'
              className={cn(
                Typography.TITLE_1_BOLD,
                'h-[40px] w-full rounded-none border-gray-800 pb-5 pt-0 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none'
              )}>
              수업
            </TabsTrigger>
            <TabsTrigger
              value='community'
              className={cn(
                Typography.TITLE_1_BOLD,
                'h-[40px] w-full rounded-none border-gray-800 pb-5 pt-0 text-gray-500 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:text-gray-800 data-[state=active]:shadow-none'
              )}>
              커뮤니티
            </TabsTrigger>
          </TabsList>
          <TabsContent value='lesson' className='flex-grow'>
            {data && data.length === 0 && (
              <div className={cn(FLEX_CENTER, 'flex h-full w-full flex-col gap-4')}>
                <IconAlarmBig />
                <p className={cn(Typography.HEADING_4_BOLD, 'text-gray-400')}>
                  새로운 알림이 없습니다
                </p>
              </div>
            )}
            {data &&
              data.length > 0 &&
              data.map((item) => {
                const relativeTime = formatTimestampToRelativeTime(item.timestamp);
                return (
                  <button
                    key={item.notification_id}
                    className={cn(
                      'flex w-full items-stretch gap-6 p-7',
                      item.is_read ? 'bg-white' : 'bg-blue-50'
                    )}
                    onClick={() => handleCheckAlarm(item)}>
                    <Image
                      src={item.sender_profile_image}
                      width={37}
                      height={37}
                      alt='alarm profile'
                      className={cn('h-fit rounded-full')}
                      priority
                    />
                    <div className='flex flex-col items-start'>
                      <div className='flex flex-col items-start'>
                        <h3 className={cn(Typography.TITLE_1_BOLD)}>예약 신청</h3>
                        <p className={cn(Typography.BODY_3)}>{item.content}</p>
                      </div>
                      <span className={cn(Typography.BODY_4_REGULAR)}>
                        {relativeTime}
                      </span>
                    </div>
                  </button>
                );
              })}
          </TabsContent>
          <TabsContent value='community'>
            {/* TODO) 수업 피드백 목록과 커뮤니티 피드백 목록의 차이점을 아직 몰라서 작성하지 않음 */}
            <div>커뮤니티</div>
          </TabsContent>
        </Tabs>
      </Layout.Contents>
    </Layout>
  );
};

export { TrainerAlarmPage };
