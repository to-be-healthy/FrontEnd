'use client';

import Link from 'next/link';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Switch } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const EditAlarmPage = () => {
  const changeAlarm = (checked: boolean, id: string) => {
    console.log(id, checked);
  };

  return (
    <Layout>
      <Layout.Header className='bg-white'>
        <Link href={'/trainer/mypage'}>
          <IconBack />
        </Link>
      </Layout.Header>
      <Layout.Contents>
        <h1 className={cn(Typography.HEADING_3, 'bg-white px-7 pb-7 pt-8')}>알림 설정</h1>
        <section className='flex items-center justify-between bg-white px-7 py-[18px]'>
          <p className={cn(Typography.BODY_1)}>앱 푸쉬 알림</p>
          <Switch
            id='push'
            defaultChecked={true}
            onCheckedChange={(checked) => changeAlarm(checked, 'push')}
          />
        </section>
        <section className='mt-3 flex items-center justify-between bg-white px-7 py-6'>
          <div className='flex flex-col'>
            <p className={cn(Typography.BODY_1)}>커뮤니티</p>
            <span className={cn(Typography.BODY_2, 'text-gray-600')}>
              내 글에 댓글, 좋아요
            </span>
          </div>
          <Switch
            id='community'
            defaultChecked={true}
            onCheckedChange={(checked) => changeAlarm(checked, 'community')}
          />
        </section>
        <section className='flex items-center justify-between bg-white px-7 py-6'>
          <div className='flex flex-col'>
            <p className={cn(Typography.BODY_1)}>피드백</p>
            <span className={cn(Typography.BODY_2, 'text-gray-600')}>
              수업 일지, 식단 피드백 작성 알림
            </span>
          </div>
          <Switch
            id='feedback'
            defaultChecked={true}
            onCheckedChange={(checked) => changeAlarm(checked, 'feedback')}
          />
        </section>
      </Layout.Contents>
    </Layout>
  );
};

export { EditAlarmPage };
