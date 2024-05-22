'use client';

import Link from 'next/link';

import { IconBack } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const CSPage = () => {
  const CS_EMAIL = 'to-be-healthy@gmail.com';

  const copyEmail = async () => {
    await navigator.clipboard.writeText(CS_EMAIL);
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Link href={'/trainer/mypage'}>
          <IconBack />
        </Link>
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
