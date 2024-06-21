'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InviteForm, useInviteStudentMutation, useMyInfoQuery } from '@/feature/member';
import { IconCheck, IconError } from '@/shared/assets';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import { Typography } from '@/shared/mixin';
import { Button, Dialog, DialogContent, Input, useToast } from '@/shared/ui';
import { cn, twSelector } from '@/shared/utils';
import { Layout } from '@/widget';

export const TrainerInvitePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteForm>();
  const [invitationUrl, setInvitationUrl] = useState<string>('');
  const dialogOpen = !!invitationUrl;

  const { toast } = useToast();
  const { mutate } = useInviteStudentMutation();
  const { data } = useMyInfoQuery();
  const gymName = data?.gym.name ?? '';
  const trainerName = data?.name ?? '';

  const onValidSubmit: SubmitHandler<InviteForm> = (invitationInfo) => {
    mutate(invitationInfo, {
      onSuccess: ({ data }) => {
        const { invitationLink } = data;
        setInvitationUrl(invitationLink);
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        toast({
          className: 'h-[48px]',
          description: (
            <div className='flex items-center justify-center'>
              <IconError />
              <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>{message}</p>
            </div>
          ),
          duration: 2000,
        });
      },
    });
  };

  const onInvalidSubmit = () => {
    toast({
      className: 'h-[48px]',
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

  const resetInvitationForm = () => {
    reset();
    setInvitationUrl('');
  };

  const copyUrl = async () => {
    await navigator.clipboard.writeText(invitationUrl);
    resetInvitationForm();
    toast({
      className: 'h-[48px]',
      description: (
        <div className='flex items-center justify-center'>
          <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
          <p className={cn(Typography.HEADING_5, 'ml-6 text-white')}>
            초대 링크를 복사했어요.
          </p>
        </div>
      ),
      duration: 2000,
    });
  };

  const shareUrl = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '초대장이 도착했어요!',
        description: `${gymName} ${trainerName} 트레이너님이 초대장을 보냈어요!`.trim(),
        imageUrl: '/images/invitation.png',
        link: {
          mobileWebUrl: invitationUrl,
          webUrl: invitationUrl,
        },
      },
      buttons: [
        {
          title: '초대장 확인하기',
          link: {
            mobileWebUrl: invitationUrl,
            webUrl: invitationUrl,
          },
        },
      ],
    });
    resetInvitationForm();
  };

  return (
    <Layout>
      <Layout.Header className='flex-row-reverse'>
        <Button
          variant='outline'
          className='border-none bg-transparent p-0 hover:bg-transparent'
          asChild>
          <Link href={'/trainer/manage'}>
            <CloseIcon width={20} height={20} />
          </Link>
        </Button>
        <h1 className={cn(Typography.HEADING_4)}>회원추가</h1>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
      </Layout.Header>
      <Layout.Contents className='px-7'>
        <h2 className={cn(Typography.HEADING_3, 'py-11')}>회원님의 정보를 알려주세요.</h2>
        <div className='flex w-full items-center justify-center py-11'>
          <Image
            src='/images/letter_blue-heart.png'
            width={110}
            height={110}
            alt='letter blue heart'
            className='px-auto'
          />
        </div>
        <form
          id='invite-form'
          className={cn('flex justify-center gap-x-3', Typography.TITLE_3)}>
          <div className='flex flex-col gap-y-3'>
            <p>이름</p>
            <div
              className={cn(
                'flex rounded-md border border-gray-200 bg-white px-6 py-[11.5px] focus-within:border-primary-500',
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
          <div className='flex flex-col gap-y-3'>
            <p>수업 할 PT 횟수</p>
            <div
              className={cn(
                'flex gap-x-4 rounded-md border border-gray-200 bg-white px-6 py-[11.5px] focus-within:border-primary-500',
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
                  'right-6 text-gray-500'
                )}>
                회
              </div>
            </div>
          </div>
        </form>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button
          variant='default'
          size='full'
          className={cn(Typography.TITLE_1_BOLD)}
          onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}>
          완료
        </Button>
      </Layout.BottomArea>
      <Dialog open={dialogOpen}>
        <DialogContent className='rounded-t-5 bottom-0 top-auto flex max-w-[var(--max-width)] translate-y-0 flex-col items-center justify-center px-7 py-10'>
          <h4 className={Typography.HEADING_4_BOLD}>회원님을 초대해주세요.</h4>
          <p
            className={cn(
              Typography.BODY_1,
              'whitespace-pre-wrap break-keep text-center text-gray-600'
            )}>{`초대 링크로 가입하면 입력하신 정보로\n바로 가입할 수 있습니다.`}</p>
          <div className='flex w-full gap-x-3'>
            <Button
              size='full'
              variant='secondary'
              className={cn(Typography.TITLE_1_SEMIBOLD)}
              onClick={copyUrl}>
              링크 복사하기
            </Button>
            <Button
              size='full'
              className={Typography.TITLE_1_SEMIBOLD}
              onClick={shareUrl}>
              공유하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};
