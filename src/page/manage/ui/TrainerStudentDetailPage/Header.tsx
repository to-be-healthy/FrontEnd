import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteStudentMutation } from '@/feature/member';
import { IconBack, IconDotsVertical } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const Header = ({ name, memberId }: { name: string; memberId: number }) => {
  const router = useRouter();
  const { showErrorToast } = useShowErrorToast();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const { mutate } = useDeleteStudentMutation();

  const deleteStudent = () => {
    mutate(memberId, {
      onSuccess: () => {
        router.replace('/trainer/manage');
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  return (
    <Layout.Header>
      <Link href='/trainer/manage'>
        <IconBack />
      </Link>
      <h2
        className={cn(
          Typography.HEADING_4_SEMIBOLD,
          'absolute left-1/2 translate-x-[-50%] text-[$000]'
        )}>
        회원 정보
      </h2>
      <DropdownMenu open={open} onOpenChange={(state) => setOpen(state)}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className={Typography.TITLE_1_SEMIBOLD}>
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
          <DropdownMenuGroup className='flex flex-col'>
            <DropdownMenuItem
              className={cn(Typography.TITLE_3, 'px-[16px] py-[12px]')}
              asChild>
              <Link href={`/trainer/manage/${memberId}/edit/nickname`}>별칭 설정</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(Typography.TITLE_3, 'px-[16px] py-[12px] text-start')}
              onClick={() => setModal(true)}>
              회원 삭제
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={modal} onOpenChange={(state) => setModal(state)}>
        <AlertDialogContent>
          <AlertDialogHeader className='mb-8 text-center'>
            <AlertDialogTitle className={cn(Typography.TITLE_1, 'text-center')}>
              {name}님을 삭제하시겠습니까?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className='flex flex-row gap-3'>
            <AlertDialogCancel
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'mt-0 h-[48px] w-full rounded-md bg-gray-100 text-gray-600'
              )}>
              아니요
            </AlertDialogCancel>
            <AlertDialogAction
              asChild
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'mt-0 h-[48px] w-full rounded-md bg-point text-white'
              )}>
              <Button variant='ghost' onClick={deleteStudent}>
                예
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout.Header>
  );
};

export { Header };
