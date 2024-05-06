'use Client';

import Link from 'next/link';

import CloseIcon from '@/shared/assets/images/icon_close.svg';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/shared/ui';

export const SignUpCancelDialog = ({ type }: { type: string | null | undefined }) => {
  const validType = type ?? '';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='outline'
          className='border-none bg-transparent p-0 hover:bg-transparent'>
          <CloseIcon width={20} height={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className='mb-[24px] text-left'>
          <AlertDialogTitle className='typography-heading-4 mb-3'>
            회원가입을 그만둘까요?
          </AlertDialogTitle>
          <AlertDialogDescription>
            지금까지 작성한 정보는 저장되지 않아요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
          <AlertDialogAction
            asChild
            className='mt-0 h-[48px] rounded-md bg-[#E2F1FF] text-primary-500'>
            <Link href={`/sign-in?type=${validType}`}>확인</Link>
          </AlertDialogAction>
          <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-primary-500 text-[#fff]'>
            취소
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
