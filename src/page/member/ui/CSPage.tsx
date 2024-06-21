'use client';

import { useRouter } from 'next/navigation';

import { IconBack, IconCheck } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Button, useToast } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const CSPage = () => {
  const CS_EMAIL = 'tobehealthy0127@gmail.com';

  const router = useRouter();
  const { toast } = useToast();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CS_EMAIL);
    toast({
      className: 'py-5 px-6',
      description: (
        <div className={cn('flex w-[320px] items-center gap-6')}>
          <IconCheck fill={'var(--primary-500)'} width={24} height={24} />
          <p className={cn(Typography.HEADING_5, 'text-white')}>이메일을 복사했어요.</p>
        </div>
      ),
      duration: 2000,
    });
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button variant='ghost' className='p-0' onClick={() => router.back()}>
          <IconBack />
        </Button>
      </Layout.Header>
      <Layout.Contents className='px-7'>
        <h1 className={cn(Typography.HEADING_3, 'pb-6 pt-7')}>고객센터</h1>
        <div className='space-y-[12px] rounded-lg border border-gray-100 px-6 py-7'>
          <p className={cn(Typography.BODY_1)}>이메일 문의</p>
          <div className='space-x-5'>
            <span className={cn(Typography.TITLE_1_SEMIBOLD)}>{CS_EMAIL}</span>
            <button
              className={cn(
                Typography.BODY_2,
                'text-gray-400 underline underline-offset-2'
              )}
              onClick={copyEmail}>
              복사
            </button>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};

export { CSPage };
