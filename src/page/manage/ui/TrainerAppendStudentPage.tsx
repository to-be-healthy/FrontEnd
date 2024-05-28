'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppendMemberForm } from '@/feature/member';
import { useAppendMemberMutation } from '@/feature/member/api/useAppendMemberMutation';
import { IconCheck, IconError } from '@/shared/assets';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { Typography } from '@/shared/mixin';
import { Button, Input } from '@/shared/ui';
import { toast } from '@/shared/ui/toast/use-toast';
import { cn, twSelector } from '@/shared/utils';
import { Layout } from '@/widget';

export const TrainerAppendStudentPage = ({ memberId }: { memberId: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams?.get('name');
  if (!name || !memberId) {
    throw new Error();
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
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
            className: 'h-[48px]',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-white'>
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
          toast({
            className: 'h-[48px]',
            description: (
              <div className='flex items-center justify-center'>
                <IconError />
                <p className='typography-heading-5 ml-6 text-white'>{message}</p>
              </div>
            ),
            duration: 2000,
          });
        },
      }
    );
  };

  const onInvalidSubmit = () => {
    toast({
      className: 'h-[48px]',
      description: (
        <div className='flex items-center justify-center'>
          <IconError />
          <p className='typography-heading-5 ml-6 text-white'>
            입력이 필요한 항목이 있습니다.
          </p>
        </div>
      ),
      duration: 2000,
    });
  };

  return (
    <Layout>
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
      <Layout.Contents className='px-[20px] py-[48px]'>
        <h2
          className={cn(
            Typography.HEADING_3,
            'whitespace-pre-wrap break-keep'
          )}>{`${name}님의 수강 정보를\n알려주세요.`}</h2>
        <form
          id='append-member-form'
          className={cn(Typography.TITLE_3, 'mt-[42px] flex justify-center gap-x-[8px]')}>
          <div className='flex flex-col gap-y-[8px]'>
            <p>이름</p>
            <div
              className={cn(
                'flex rounded-md border border-gray-200 bg-white px-[16px] py-[11.5px] focus-within:border-primary-500',
                errors.name && 'border-point focus-within:border-point'
              )}>
              <Input
                placeholder='실명 입력'
                className={cn(
                  'w-full',
                  Typography.TITLE_3,
                  twSelector('placeholder', Typography.BODY_3)
                )}
                {...register('name', {
                  required: true,
                })}
              />
            </div>
          </div>
          <div className='flex flex-col gap-y-[8px]'>
            <p>수업 할 PT 횟수</p>
            <div
              className={cn(
                'flex gap-x-[10px] rounded-md border border-gray-200 bg-white px-[16px] py-[11.5px] focus-within:border-primary-500',
                errors.lessonCnt && 'border-point focus-within:border-point'
              )}>
              <Input
                type='number'
                className={cn(
                  'no-spin w-full',
                  Typography.TITLE_3,
                  twSelector('placeholder', Typography.BODY_3)
                )}
                {...register('lessonCnt', {
                  required: true,
                })}
              />
              <div
                className={cn(
                  Typography.BODY_3,
                  twSelector('placeholder', Typography.BODY_3),
                  'right-[16px] text-gray-500'
                )}>
                회
              </div>
            </div>
          </div>
        </form>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button
          formTarget='append-member-form'
          variant='default'
          size='full'
          onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}>
          추가하기
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};
