'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppendMemberForm } from '@/feature/member';
import { useAppendMemberMutation } from '@/feature/member/api/useAppendMemberMutation';
import { IconCheck, IconError } from '@/shared/assets';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { toast } from '@/shared/ui/toast/use-toast';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

export const TrainerAppendStudentPage = ({ memberId }: { memberId: number }) => {
  const router = useRouter();
  const { showErrorToast } = useShowErrorToast();
  const searchParams = useSearchParams();
  const name = searchParams?.get('name');
  if (!name || !memberId) {
    throw new Error();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AppendMemberForm>();

  const queryClient = useQueryClient();
  const { mutate } = useAppendMemberMutation();

  const onValidSubmit: SubmitHandler<AppendMemberForm> = (form) => {
    mutate(
      { ...form, memberId },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({ queryKey: ['notRegisteredStudents'] });

          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>
                  회원이 추가되었습니다.
                </p>
              </div>
            ),
            duration: 2000,
          });
          router.replace('/trainer/manage/append');
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  const onInvalidSubmit = () => {
    toast({
      className: 'h-12',
      description: (
        <div className='flex items-center justify-center'>
          <IconError />
          <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>
            입력이 필요한 항목이 있습니다.
          </p>
        </div>
      ),
      duration: 2000,
    });
  };

  const buttonDisabled = !watch('lessonCnt');

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>회원 추가</h1>
        <Button
          variant='outline'
          className='border-none bg-transparent p-0 hover:bg-transparent'
          asChild>
          <Link href={'/trainer/manage/append'}>
            <CloseIcon width={20} height={20} />
          </Link>
        </Button>
      </Layout.Header>
      <Layout.Contents className='px-7 py-12'>
        <h2
          className={cn(
            Typography.HEADING_3,
            'whitespace-pre-wrap break-keep'
          )}>{`${name}님의 수강 정보를\n알려주세요.`}</h2>
        <form
          id='append-member-form'
          className={cn(Typography.TITLE_3, 'mt-[42px] flex justify-center gap-x-3')}>
          <div className='flex flex-col gap-y-3'>
            <p>이름</p>
            <div
              className={cn(
                'flex rounded-md border border-gray-200 bg-white px-6 py-[11.5px]'
              )}>
              <Input
                defaultValue={name}
                readOnly
                className={cn(Typography.TITLE_1_SEMIBOLD, 'read-only:text- w-full')}
                {...register('name')}
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-3'>
            <p>수업 할 PT 횟수</p>
            <div
              className={cn(
                'flex gap-x-4 rounded-md border border-gray-200 bg-white px-6 py-[11.5px] focus-within:border-primary-500',
                errors.lessonCnt && 'border-point focus-within:border-point'
              )}>
              <Input
                type='number'
                className={cn(Typography.TITLE_1_SEMIBOLD, 'w-full')}
                {...register('lessonCnt', {
                  required: true,
                  max: 500,
                })}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const count = Number(e.target.value);
                  if (count > 500) {
                    showErrorToast('수강권 횟수는 최대 500회까지 입력할 수 있습니다.');
                    e.target.value = String(500);
                  }
                }}
              />
              <div className={cn(Typography.BODY_1, 'right-6 text-gray-500')}>회</div>
            </div>
          </div>
        </form>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button
          formTarget='append-member-form'
          variant='default'
          size='full'
          onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          disabled={buttonDisabled}
          className={cn(Typography.TITLE_1_BOLD)}>
          추가하기
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};
