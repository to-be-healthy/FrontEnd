import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteLogMutation, useLogTrainerCommentContext } from '@/feature/log';
import {
  IconBack,
  IconCheck,
  IconDotsVertical,
  IconEdit,
  IconTrash,
} from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const Header = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { showErrorToast } = useShowErrorToast();
  const { logId, memberId } = useLogTrainerCommentContext();
  const { mutate } = useDeleteLogMutation();

  const deleteLog = () => {
    mutate(
      { logId },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({ queryKey: ['studentLogList', memberId] });
          // TODO) positive toast hook
          toast({
            className: 'py-5 px-6',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                <p className='typography-heading-5 ml-6 text-white'>
                  수업 일지가 삭제되었습니다.
                </p>
              </div>
            ),
            duration: 2000,
          });
          router.replace(`/trainer/manage/${memberId}/log`);
        },
        onError: (error) => {
          const message = error?.response?.data.message ?? '문제가 발생했습니다.';
          showErrorToast(message);
        },
      }
    );
  };

  return (
    <Layout.Header>
      <button onClick={() => router.back()}>
        <IconBack />
      </button>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(Typography.TITLE_1_SEMIBOLD, FLEX_CENTER, 'w-6')}>
          <IconDotsVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
          <DropdownMenuGroup className='flex flex-col'>
            <DropdownMenuItem
              className='typography-title-3 flex items-center gap-[8px] px-[16px] py-[12px]'
              onClick={() =>
                router.replace(`/trainer/manage/${memberId}/log/${logId}/edit`)
              }>
              <IconEdit />
              수정
            </DropdownMenuItem>
            <DropdownMenuItem
              className='typography-title-3 flex items-center gap-[8px] px-[16px] py-[12px] text-point'
              onClick={() => setOpen(true)}>
              <IconTrash />
              삭제
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className='space-y-[24px] px-7 py-11'>
          <AlertDialogHeader
            className={cn(Typography.TITLE_1_SEMIBOLD, 'mx-auto text-center')}>
            게시글을 삭제하시겠습니까?
          </AlertDialogHeader>
          <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
            <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-gray-100 text-base font-normal text-gray-600'>
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              asChild
              className='mt-0 h-[48px] rounded-md bg-point text-base font-normal text-[#fff]'>
              <Button variant='ghost' onClick={deleteLog}>
                삭제
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout.Header>
  );
};

export { Header };
