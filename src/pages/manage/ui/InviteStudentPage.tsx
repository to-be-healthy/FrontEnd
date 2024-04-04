import Image from 'next/image';
import Link from 'next/link';

import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { Button, Layout } from '@/shared/ui';

export const InviteStudentPage = () => {
  return (
    <Layout>
      <Layout.Header className='flex-row-reverse'>
        <Button
          variant='outline'
          className='border-none bg-transparent p-0 hover:bg-transparent'
          asChild>
          <Link href={'/trainer/manage'}>
            <CloseIcon />
          </Link>
        </Button>
        <h1 className='typography-heading-4 font-semibold'>회원추가</h1>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
      </Layout.Header>
      <Layout.Contents>
        <h2 className='typography-heading-3 px-[20px] py-[36px]'>
          회원님의 정보를 알려주세요.
        </h2>
        <div className='flex w-full items-center justify-center py-[36px]'>
          <Image
            src='/images/letter_blue-heart.png'
            width={110}
            height={110}
            alt='letter blue heart'
            className='px-auto'
          />
        </div>
      </Layout.Contents>
    </Layout>
  );
};
