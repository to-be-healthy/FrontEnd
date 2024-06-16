'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { useChangeMyNameMutation, useMyInfoQuery } from '@/feature/member';
import { IconBack } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const EditNamePage = () => {
  const router = useRouter();
  const { data } = useMyInfoQuery();
  const [name, setName] = useState('');
  const { mutate } = useChangeMyNameMutation();
  const { showErrorToast } = useShowErrorToast();
  const queryClient = useQueryClient();

  const changeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitNewName = () => {
    mutate(name, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['myinfo'],
        });
        router.replace('/trainer/mypage/info');
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  const disabledButton = name === data?.name || name === '';

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <button onClick={() => router.back()}>
          <IconBack />
        </button>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>이름 변경</h1>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
      </Layout.Header>
      <Layout.Contents className='space-y-3 px-7 pt-8'>
        <h3 className={cn(Typography.TITLE_3)}>변경하실 이름을 입력해주세요.</h3>
        <div className='rounded-md border border-gray-200 px-6 py-[13px]'>
          <Input defaultValue={data?.name} onChange={changeName} className='w-full' />
        </div>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button size='full' disabled={disabledButton} onClick={submitNewName}>
          변경 완료
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};

export { EditNamePage };
