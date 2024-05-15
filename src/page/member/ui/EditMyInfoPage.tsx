'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthAction } from '@/entity/auth';
import { useMyInfoQuery } from '@/feature/member';
import { IconArrowRightSmall, IconAvatar, IconBack, IconCamera } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Layout } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

const EditMyInfoPage = () => {
  const router = useRouter();
  const { data } = useMyInfoQuery();
  const { deleteUserInfo } = useAuthAction();
  const isSocialAccount = data?.socialType !== 'NONE';

  const deleteProfileImage = () => {
    console.log('deleteProfileImage');
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Link href={'/trainer/mypage/info'}>
          <IconBack />
        </Link>
      </Layout.Header>
      <Layout.Contents className='flex flex-col'>
        <section className='flex w-full flex-col items-center justify-center gap-6 pt-6'>
          <div className='relative'>
            {data?.profile ? (
              <Image
                src={data.profile.fileUrl}
                alt='profile'
                width={80}
                height={80}
                className='rounded-full border border-gray-300'
              />
            ) : (
              <IconAvatar />
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className='absolute -bottom-1 -right-1 rounded-full border border-gray-300 bg-white p-2'>
                <IconCamera fill={'var(--gray-500)'} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className={cn(Typography.TITLE_3, 'px-6 py-[13.5px]')}>
                    앨범에서 선택
                  </DropdownMenuItem>
                  {data?.profile && (
                    <DropdownMenuItem
                      className={cn(Typography.TITLE_3, 'px-6 py-[13.5px]')}
                      onClick={deleteProfileImage}>
                      사진 삭제
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h3 className={cn(Typography.HEADING_2)}>{data?.name}</h3>
        </section>
        <section className='flex-grow'>
          <div className='mx-7 mt-[36px] rounded-lg border border-gray-100'>
            <div className='flex items-center justify-between border-b border-gray-100 px-6 py-7'>
              <p className={cn(Typography.TITLE_1_SEMIBOLD)}>이름</p>
              <div
                className={cn(
                  Typography.BODY_3,
                  'flex items-center gap-3 text-gray-500'
                )}>
                {data?.name}
                {!isSocialAccount && (
                  <Link href={'/trainer/mypage/info/edit/name'}>
                    <IconArrowRightSmall />
                  </Link>
                )}
              </div>
            </div>
            <div className='flex items-center justify-between border-b border-gray-100 px-6 py-7'>
              <p className={cn(Typography.TITLE_1_SEMIBOLD)}>이메일</p>
              <div
                className={cn(
                  Typography.BODY_3,
                  'flex items-center gap-3 text-gray-500'
                )}>
                {data?.email}
                {!isSocialAccount && (
                  <Link href={'/trainer/mypage/info/edit/email'}>
                    <IconArrowRightSmall />
                  </Link>
                )}
              </div>
            </div>
            {data && isSocialAccount ? (
              <div className='flex items-center justify-between px-6 py-7'>
                <p className={cn(Typography.TITLE_1_SEMIBOLD)}>계정 연동 설정</p>
              </div>
            ) : (
              <div className='flex items-center justify-between px-6 py-7'>
                <p className={cn(Typography.TITLE_1_SEMIBOLD)}>비밀번호 변경</p>
                <Link href={'/trainer/mypage/info/edit/password'}>
                  <IconArrowRightSmall />
                </Link>
              </div>
            )}
          </div>
        </section>
        <section className='mb-[60px] mt-auto flex w-full items-center justify-center gap-3'>
          <button
            className={cn(Typography.BODY_2, 'bg-transparent text-gray-500')}
            onClick={() => {
              deleteUserInfo();
              router.push('/');
            }}>
            로그아웃
          </button>
          <div className='h-[10px] w-[1px] bg-gray-300' />
          <Link
            href={'/trainer/mypage/leave'}
            className={cn(Typography.BODY_2, 'text-gray-500')}>
            탈퇴하기
          </Link>
        </section>
      </Layout.Contents>
    </Layout>
  );
};

export { EditMyInfoPage };
