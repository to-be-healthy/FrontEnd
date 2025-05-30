'use client';
/* eslint-disable @next/next/no-img-element */
import { DialogTrigger } from '@radix-ui/react-dialog';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import {
  MealType,
  useDeleteDietMutation,
  useDietCancelLikeMutation,
  useDietLikeMutation,
  useStudentDietDetailQuery,
} from '@/entity/diet';
import {
  DietCommentContext,
  DietCommentInput,
  DietCommentList,
  useDietComment,
  useDietCommentListQuery,
} from '@/feature/log-diet';
import {
  IconBack,
  IconChat,
  IconCheck,
  IconEdit,
  IconKebabMenu,
  IconLike,
  IconTrash,
  IconWhiteClose,
} from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogClose,
  DialogContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const dietDay: MealType[] = ['breakfast', 'lunch', 'dinner'];

interface Props {
  dietId: number;
}
const ITEMS_PER_PAGE = 20;

const dietText = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const StudentDietDetailPage = ({ dietId }: Props) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const month = searchParams.get('month');
  const { successToast, errorToast } = useToast();

  const { data: dietData } = useStudentDietDetailQuery(dietId);
  const { data: commentData } = useDietCommentListQuery({ dietId, size: ITEMS_PER_PAGE });
  const { mutate: likeMutate } = useDietLikeMutation();
  const { mutate: cancelLikeMutate } = useDietCancelLikeMutation();
  const { mutate: deleteDietMutate } = useDeleteDietMutation();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const value = useDietComment({ dietId, ref: inputRef });
  const dietValue = dayjs(dietData?.eatDate).format('MM월 DD일 (dd)');
  const todayValue = dayjs(new Date()).format('MM월 DD일 (dd)');

  const onClickLike = () => {
    likeMutate(dietId, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['studentDietDetail', dietId],
        });
      },
      onError: (error) => {
        errorToast(error?.response?.data.message);
      },
    });
  };

  const onClickCancelLike = () => {
    cancelLikeMutate(dietId, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['studentDietDetail', dietId],
        });
      },
      onError: (error) => {
        errorToast(error?.response?.data.message);
      },
    });
  };

  const deleteDiet = (dietId: number) => {
    deleteDietMutate(dietId, {
      onSuccess: ({ message }) => {
        router.push(`/student/diet?month=${month}`);
        successToast(message);
      },
      onError: (error) => {
        errorToast(error?.response?.data.message);
      },
    });
  };

  return (
    <DietCommentContext.Provider value={value}>
      <Layout>
        {dietData && commentData && (
          <>
            <Layout.Header>
              <button onClick={() => router.back()}>
                <IconBack />
              </button>
              <h2 className={cn(Typography.HEADING_4_SEMIBOLD, 'layout-header-title')}>
                {dietValue === todayValue
                  ? '오늘 '
                  : dayjs(dietData?.eatDate).format('MM월 DD일 ')}
                식단
              </h2>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(Typography.TITLE_1_SEMIBOLD, 'flex-center w-6')}>
                  <IconKebabMenu />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='absolute -right-5 top-0 flex w-[120px] flex-col bg-white'>
                  <DropdownMenuGroup className='flex flex-col'>
                    <DropdownMenuItem
                      className={cn(
                        Typography.TITLE_3,
                        'flex items-center gap-3 px-6 py-5'
                      )}
                      asChild>
                      <Link href={`/student/diet/${dietId}/edit?month=${month}`}>
                        <IconEdit />
                        수정
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={cn(
                        Typography.TITLE_3,
                        'flex items-center gap-3 px-6 py-5 text-point'
                      )}
                      onClick={() => setOpen(true)}>
                      <IconTrash />
                      삭제
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className='gap-y-8 py-11'>
                  <AlertDialogHeader
                    className={cn(Typography.TITLE_1_SEMIBOLD, 'mx-auto text-center')}>
                    식단을 삭제하시겠습니까?
                  </AlertDialogHeader>
                  <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
                    <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-gray-100 text-base font-normal text-gray-600'>
                      취소
                    </AlertDialogCancel>
                    <AlertDialogAction
                      asChild
                      className='mt-0 h-[48px] rounded-md bg-point text-base font-normal text-white'>
                      <Button variant='ghost' onClick={() => deleteDiet(dietId)}>
                        삭제
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Layout.Header>
            <Layout.Contents>
              <div className='px-7 py-6'>
                <Card className='w-full px-0'>
                  <CardHeader
                    className={(Typography.TITLE_3, 'mb-4 px-7 text-left text-gray-600')}>
                    {dietValue === todayValue ? '오늘' : dietValue}
                  </CardHeader>
                  <CardContent>
                    <article className='mb-6 flex justify-between px-7'>
                      {dietDay.map((mealType: MealType) => {
                        const meal = dietData[mealType];
                        return (
                          <div
                            className='flex w-[calc((100%-12px)/3)] flex-col items-center justify-between'
                            key={mealType}>
                            <div className='mb-1 w-full'>
                              {meal.fast && (
                                <div
                                  className={cn(
                                    Typography.TITLE_2,
                                    'flex h-[88px] w-full flex-col items-center justify-center rounded-md bg-gray-100 p-0 text-center text-gray-400'
                                  )}>
                                  <span className='mb-1'>
                                    <IconCheck
                                      fill={'var(--primary-500)'}
                                      width={17}
                                      height={17}
                                    />
                                  </span>
                                  단식
                                </div>
                              )}
                              {!meal.fast && meal.dietFile?.fileUrl && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      className='h-[88px] w-full p-0'>
                                      <img
                                        src={`${meal.dietFile.fileUrl}?w=400&q=90`}
                                        alt={meal.type}
                                        className='custom-image rounded-md'
                                      />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className='block h-full gap-0 border-none bg-black p-0'>
                                    <div className='relative flex h-[56px] w-full px-7 py-6'>
                                      <DialogClose className='text-white'>
                                        <IconWhiteClose stroke='white' />
                                      </DialogClose>
                                    </div>
                                    <div className='flex h-[calc(100%-56px)] w-full items-center justify-center'>
                                      <img
                                        src={`${meal.dietFile.fileUrl}?w=1200&q=90`}
                                        alt={meal.type}
                                        className='max-w-screen h-full object-contain'
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                              {!meal.fast && !meal.dietFile && (
                                <div className='h-[88px] w-full rounded-md bg-gray-100 p-0' />
                              )}
                            </div>
                            <span
                              className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
                              {dietText[meal.type]}
                            </span>
                          </div>
                        );
                      })}
                    </article>

                    <div className='mb-7 flex items-center justify-start px-7'>
                      <div className='flex items-center'>
                        {dietData.liked ? (
                          <Button
                            variant='ghost'
                            className='h-auto p-0'
                            onClick={onClickCancelLike}>
                            <IconLike
                              stroke='var(--point-color)'
                              fill='var(--point-color)'
                            />
                          </Button>
                        ) : (
                          <Button
                            variant='ghost'
                            className='h-auto p-0'
                            onClick={onClickLike}>
                            <IconLike stroke='var(--gray-500)' />
                          </Button>
                        )}
                        <span className='ml-1'>{dietData.likeCnt}</span>
                      </div>
                      <div className='ml-4 flex items-center'>
                        <IconChat />
                        <p className={cn(Typography.BODY_4_MEDIUM, 'ml-1 text-gray-500')}>
                          댓글 <span className='ml-[2px]'>{dietData.commentCnt}</span>
                        </p>
                      </div>
                    </div>

                    <DietCommentList
                      dietId={dietId}
                      comments={
                        commentData?.pages[0].content !== null
                          ? commentData?.pages[0].content
                          : []
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </Layout.Contents>
            <Layout.BottomArea className='p-0'>
              <DietCommentInput />
            </Layout.BottomArea>
          </>
        )}
      </Layout>
    </DietCommentContext.Provider>
  );
};
