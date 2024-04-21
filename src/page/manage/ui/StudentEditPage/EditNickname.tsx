import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

import { useEditNicknameMutation } from '@/feature/manage';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import IconClose from '@/shared/assets/images/icon_close.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile.svg';
import ErrorIcon from '@/shared/assets/images/icon_error.svg';
import { Typography } from '@/shared/mixin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
  Layout,
  useToast,
} from '@/shared/ui';
import { cn, twSelector } from '@/shared/utils';

import { StudentEditContext } from './index';

const EditNickname = () => {
  const router = useRouter();
  const { toast } = useToast();

  const value = useContext(StudentEditContext);
  if (!value) {
    throw new Error();
  }
  const { memberId, name, nickname } = value;

  const [newNickname, setNewNickname] = useState(nickname ?? '');
  const { mutate } = useEditNicknameMutation();

  const submitChangeNickname = () => {
    if (!newNickname) {
      return toast({
        className: 'py-5 px-6',
        description: (
          <div className='flex items-center justify-center'>
            <ErrorIcon />
            <p className='typography-heading-5 ml-6 text-white'>별칭을 입력해주세요.</p>
          </div>
        ),
        duration: 2000,
      });
    }
    if (nickname === newNickname) {
      return toast({
        className: 'py-5 px-6',
        description: (
          <div className='flex items-center justify-center'>
            <ErrorIcon />
            <p className='typography-heading-5 ml-6 text-white'>기존 별칭과 같습니다.</p>
          </div>
        ),
        duration: 2000,
      });
    }

    changeNickname();
  };

  const changeNickname = () => {
    mutate(
      { studentId: Number(memberId), nickname: newNickname },
      {
        onSuccess: (data) => {
          toast({
            className: 'py-5 px-6',
            description: (
              <div className='flex items-center justify-center'>
                <CheckIcon fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-white'>{data.message}</p>
              </div>
            ),
            duration: 2000,
          });
          router.replace(`/trainer/manage/${memberId}`);
        },
        onError: (error) => {
          console.log(error);
          toast({
            className: 'py-5 px-6',
            description: (
              <div className='flex items-center justify-center'>
                <ErrorIcon />
                <p className='typography-heading-5 ml-6 text-white'>
                  {error.response?.data.message}
                </p>
              </div>
            ),
            duration: 2000,
          });
        },
      }
    );
  };

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.replace(`/trainer/manage/${memberId}`)}>
          <IconClose />
        </Button>
        <h2 className={Typography.HEADING_4_SEMIBOLD}>회원 별칭 설정</h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='ghost' className={cn(Typography.BODY_1, 'p-0')}>
              완료
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='space-y-[24px]'>
            <AlertDialogHeader className='text-left'>
              <AlertDialogTitle
                className={cn(Typography.TITLE_1_SEMIBOLD, 'mx-auto mb-3')}>
                별칭을 저장할까요?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
              <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-gray-100 text-gray-600'>
                아니요
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant='default'
                  className='py-[10px]'
                  onClick={submitChangeNickname}>
                  예
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Layout.Header>
      <Layout.Contents className='mt-[36px] flex flex-col gap-y-[36px] px-[20px]'>
        <Button variant='ghost' size='auto' className='mx-auto pt-[24px]'>
          <IconDefaultProfile />
        </Button>
        <div className='flex w-full flex-col space-y-[8px]'>
          <label htmlFor='name' className={Typography.TITLE_3}>
            이름
          </label>
          <div
            className={cn(
              'rounded-md border border-gray-200 bg-gray-100 px-[16px] py-[13px]'
            )}>
            <Input
              defaultValue={name}
              id='name'
              readOnly
              className={cn(
                Typography.BODY_1,
                twSelector('placeholder', Typography.BODY_1),
                'bg-transparent text-gray-500 read-only:bg-transparent'
              )}
            />
          </div>
        </div>
        <div className='flex w-full flex-col space-y-[8px]'>
          <label htmlFor='name' className={Typography.TITLE_3}>
            별칭
          </label>
          <div className={cn('rounded-md border border-gray-200 px-[16px] py-[13px]')}>
            <Input
              defaultValue={newNickname}
              id='name'
              placeholder='별칭을 입력해주세요.'
              onChange={(e) => setNewNickname(e.target.value)}
              className={cn(
                Typography.BODY_1,
                twSelector('placeholder', Typography.BODY_1),
                'bg-transparent text-gray-800 placeholder:text-gray-500'
              )}
            />
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};

export { EditNickname };
