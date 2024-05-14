'use client';

import { useRouter } from 'next/navigation';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const TrainerScheduleSettingPage = () => {
  const router = useRouter();

  const submitSetting = () => {
    console.log('submit settings');
  };

  const submitButtonDisabled = (): boolean => {
    return true;
  };

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          size='auto'
          onClick={() => router.replace('/trainer/schedule')}>
          <IconBack />
        </Button>
        <p className={cn(Typography.HEADING_4_SEMIBOLD)}>기본 수업 시간</p>
        <Button
          variant='ghost'
          size='auto'
          onClick={submitSetting}
          className={cn(
            Typography.BODY_1,
            'text-primary disabled:bg-transparent disabled:text-gray-500'
          )}
          disabled={submitButtonDisabled()}>
          저장
        </Button>
      </Layout.Header>
      <Layout.Contents className='px-7'>박혜민 화이팅</Layout.Contents>
    </Layout>
  );
};

export { TrainerScheduleSettingPage };
