'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { signUpStore } from '@/entity/auth';
import { Button, Layout } from '@/shared/ui';

export const SignUpCompletePage = () => {
  const params = useSearchParams();
  const type = params?.get('type');
  const { name } = signUpStore(); //Todo : context api 사용해서 수정

  return (
    <Layout className='bg-white'>
      <Layout.Contents>
        <div className='flex h-full w-full flex-col items-center justify-between p-[20px]'>
          <div className='flex h-full w-full flex-col items-center justify-center'>
            <Image
              className='mb-[20px]'
              src='/images/signUpComplete.png'
              width={100}
              height={100}
              alt='signUp complete'
            />
            <span className='typography-heading-4 mb-[4px] text-primary-500'>
              가입완료
            </span>
            <p className='typography-heading-1 text-gray-800'>{`${name}님, 환영합니다!`}</p>
          </div>

          <div className='w-full'>
            <Button asChild>
              <Link
                href={`/sign-in?type=${type}`}
                className='typography-title-1 h-[57px] w-full rounded-lg'>
                확인
              </Link>
            </Button>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
