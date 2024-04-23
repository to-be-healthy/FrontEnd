'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  CourseSheet,
  CourseSheetContent,
  CourseSheetTrigger,
} from '@/feature/manage/ui/CourseBottomSheet';
import {
  CourseCard,
  CourseCardContent,
  CourseCardHeader,
  courseHistoryCodeDescription,
  useAddStudentCourseMutation,
  useDeleteStudentCourseMutation,
  useStudentCourseDetailQuery,
} from '@/feature/member';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import CheckIcon from '@/shared/assets/images/icon_check.svg';
import NotificationsIcon from '@/shared/assets/images/icon_notifications.svg';
import PlusIcon from '@/shared/assets/images/icon_plus.svg';
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  memberId: number;
}

const ITEMS_PER_PAGE = 20;

export const StudentCourseDetailPage = ({ memberId }: Props) => {
  const { toast } = useToast();

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [courseInput, setCourseInput] = useState('');
  const [courseInputError, setCourseInputError] = useState('');

  const queryClient = useQueryClient();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  const {
    data: detailData,
    isPending,
    hasNextPage,
    fetchNextPage,
  } = useStudentCourseDetailQuery(memberId, ITEMS_PER_PAGE);

  const studentCourseId = Number(detailData?.pages[0]?.course.courseId);

  const { mutate: addMutation } = useAddStudentCourseMutation();
  const { mutate: deleteMutation } = useDeleteStudentCourseMutation();

  // const changeCourseInput = (e: FormEvent<HTMLInputElement>) => {
  //   let inputValue = e.currentTarget.value;
  //   if (inputValue.length > 3) {
  //     inputValue = inputValue.slice(0, 3);
  //   }

  //   if (Number(inputValue) > 500) {
  //     setCourseInputError('500회 이하로 입력해주세요.');
  //   } else {
  //     setCourseInputError('');
  //   }
  //   setCourseInput(inputValue);
  // };

  // const addCourseCount = () => {
  //   addMutation(
  //     {
  //       courseId: studentCourseId,
  //       memberId: memberId,
  //       calculation: 'PLUS',
  //       type: 'PLUS_CNT',
  //       updateCnt: courseInput,
  //     },
  //     {
  //       onSuccess: () => {
  //         setIsSheetOpen(false);
  //         void queryClient.invalidateQueries({
  //           queryKey: ['studentCourseDetail'],
  //         });
  //         return toast({
  //           className: 'h-12',
  //           description: (
  //             <div className='flex items-center justify-center'>
  //               <CheckIcon fill={'var(--primary-500)'} />
  //               <p className='typography-heading-5 ml-6 text-[#fff]'>
  //                 {courseInput}회가 연장되었습니다.
  //               </p>
  //             </div>
  //           ),
  //           duration: 2000,
  //         });
  //       },
  //       onError: (error) => {
  //         return toast({
  //           className: 'h-12',
  //           description: (
  //             <div className='flex items-center justify-center'>
  //               <CheckIcon fill={'var(--primary-500)'} />
  //               <p className='typography-heading-5 ml-6 text-[#fff]'>
  //                 {error.response?.data.message}
  //               </p>
  //             </div>
  //           ),
  //           duration: 2000,
  //         });
  //       },
  //     }
  //   );
  // };

  const deleteStudentCourse = () => {
    deleteMutation(studentCourseId, {
      onSuccess: (result) => {
        console.log(result);
        void queryClient.invalidateQueries({
          queryKey: ['studentCourseDetail'],
        });
        return toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <CheckIcon fill={'var(--primary-500)'} />
              <p className='typography-heading-5 ml-6 text-[#fff]'>
                {courseInput}회가 연장되었습니다.
              </p>
            </div>
          ),
          duration: 2000,
        });
      },
      onError: (error) => {
        return toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <CheckIcon fill={'var(--primary-500)'} />
              <p className='typography-heading-5 ml-6 text-[#fff]'>
                {error?.response?.data.message}
              </p>
            </div>
          ),
          duration: 2000,
        });
      },
    });
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  // useEffect(() => {
  //   return () => {
  //     queryClient.removeQueries({ queryKey: ['studentCourseDetail'] });
  //   };
  // }, [queryClient]);

  useEffect(() => {
    if (!isSheetOpen) {
      setCourseInput('');
      setCourseInputError('');
    }
  }, [isSheetOpen]);

  return (
    <Layout type='trainer'>
      <Layout.Header className='relative flex justify-center bg-[#fff]'>
        <Link href='./' className='absolute left-7'>
          <BackIcon />
        </Link>
        <h2>김지윤님 수강권</h2>
        {/* {detailData?.pages[0]?.course && (
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className={cn('h-[46px] w-[160px]', Typography.HEADING_5)}>
              <PlusIcon width={20} height={20} fili='#000000' />
            </SheetTrigger>
            <SheetContent
              className='m-auto mb-7 w-[calc(100%-20px)] rounded-lg px-7 pb-9 pt-8'
              closeClassName='top-7 right-7'
              xClassName='w-[22px] h-[22px] text-[#000]'
              side='bottom'>
              <SheetHeader>
                <SheetTitle
                  className={cn(cn('mb-8 text-left text-[#000]', Typography.HEADING_4))}>
                  등록할 수업 횟수
                </SheetTitle>
              </SheetHeader>
              <div className='mb-8 text-center'>
                <Input
                  type='number'
                  value={courseInput}
                  onChange={changeCourseInput}
                  className={cn(
                    'border-b-1 w-[100px] border-b border-solid border-y-gray-400 py-[2px] text-center text-[40px] font-bold leading-[130%] text-[#000] focus:border-y-primary-500',
                    courseInputError && 'focus:border-y-red-500'
                  )}
                />
                {courseInputError && (
                  <p className={cn('mt-[8px] text-[#FF4668]', Typography.BODY_4)}>
                    {courseInputError}
                  </p>
                )}
              </div>
              <Button
                className={cn('h-[52px] w-full', Typography.TITLE_1)}
                disabled={courseInput === '' || Number(courseInput) > 500}
                onClick={addCourseCount}>
                수강권 등록
              </Button>
            </SheetContent>
          </Sheet>
        )} */}
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='loading'>Loading..</div>
        ) : (
          <>
            {detailData?.pages[0]?.course ? (
              <>
                <div className='bg-[#fff] p-7 pt-6'>
                  <CourseCard key={detailData?.pages[0]?.course?.courseId}>
                    <CourseCardHeader
                      remainLessonCnt={detailData?.pages[0]?.course?.remainLessonCnt}
                    />
                    <CourseCardContent
                      totalLessonCnt={detailData?.pages[0]?.course?.totalLessonCnt ?? 0}
                      remainLessonCnt={detailData?.pages[0]?.course?.remainLessonCnt ?? 0}
                    />
                  </CourseCard>
                </div>

                <div className='bg-[#fff] p-7 pt-0'>
                  <div className='flex items-center justify-center rounded-lg bg-gray-100 text-[#000]'>
                    {/* <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                      <SheetTrigger
                        className={cn('h-[46px] w-[160px]', Typography.HEADING_5)}>
                        수업 횟수 추가
                      </SheetTrigger>
                      <SheetContent
                        className='m-auto mb-7 w-[calc(100%-20px)] rounded-lg px-7 pb-9 pt-8'
                        closeClassName='top-7 right-7'
                        xClassName='w-[22px] h-[22px] text-[#000]'
                        side='bottom'>
                        <SheetHeader>
                          <SheetTitle
                            className={cn(
                              cn('mb-8 text-left text-[#000]', Typography.HEADING_4)
                            )}>
                            추가할 수업 횟수
                          </SheetTitle>
                        </SheetHeader>
                        <div className='mb-8 text-center'>
                          <Input
                            type='number'
                            value={courseInput}
                            onChange={changeCourseInput}
                            className={cn(
                              'border-b-1 w-[100px] border-b border-solid border-y-gray-400 py-[2px] text-center text-[40px] font-bold leading-[130%] text-[#000] focus:border-y-primary-500',
                              courseInputError && 'focus:border-y-red-500'
                            )}
                          />
                          {courseInputError && (
                            <p
                              className={cn(
                                'mt-[8px] text-[#FF4668]',
                                Typography.BODY_4
                              )}>
                              {courseInputError}
                            </p>
                          )}
                        </div>
                        <Button
                          className={cn('h-[52px] w-full', Typography.TITLE_1)}
                          disabled={courseInput === '' || Number(courseInput) > 500}
                          onClick={addCourseCount}>
                          수업 횟수 추가
                        </Button>
                      </SheetContent>
                    </Sheet> */}
                    <span className='h-[30px] w-[1px] bg-gray-200'></span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='ghost'
                          className={cn('h-[46px] w-[160px]', Typography.HEADING_5)}>
                          수강권 삭제
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className='px-7 py-11'>
                        <AlertDialogHeader className='mb-8 text-center'>
                          <AlertDialogTitle className={cn(Typography.TITLE_1)}>
                            수강권을 삭제하시겠습니까?
                          </AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
                          <AlertDialogCancel className='mt-0 h-[48px] rounded-md bg-gray-100 text-base font-normal text-gray-600'>
                            아니요
                          </AlertDialogCancel>
                          <AlertDialogAction
                            asChild
                            className='mt-0 h-[48px] rounded-md bg-point text-base font-normal text-[#fff]'>
                            <Button variant='ghost' onClick={deleteStudentCourse}>
                              예
                            </Button>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <ul className='bg-gray-100'>
                  {detailData?.pages?.map((data) => {
                    return data.courseHistories?.map((item) => {
                      const date = dayjs(item.createdAt);
                      const formattedDate = date.format('YY.MM.DD');

                      return (
                        <li className='px-7 py-8' key={item.courseHistoryId}>
                          <p className='typography-body-4 text-gray-500'>
                            {formattedDate}
                          </p>
                          <dl className='flex items-center justify-between'>
                            <dt className='typography-title-3 text-gray-700'>
                              {courseHistoryCodeDescription[item.type]}
                            </dt>
                            <dd className='typography-title-3 text-[#000]'>
                              {item.calculation === 'PLUS' ? '+' : '-'}
                              {item.cnt}
                            </dd>
                          </dl>
                        </li>
                      );
                    });
                  })}
                </ul>
                {detailData?.pages[0].courseHistories.length === ITEMS_PER_PAGE &&
                  hasNextPage && (
                    <div ref={ref} className='h-[20px] p-3 text-center'>
                      loading...
                    </div>
                  )}
              </>
            ) : (
              <>
                <div className='flex flex-col items-center justify-center bg-[#fff] py-[88px]'>
                  <p className={cn('mb-3 text-gray-500', Typography.TITLE_3)}>
                    등록된 수강권이 없습니다.
                  </p>
                  {/* <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant='outline'
                        className={cn(
                          'h-[37px] w-[112px] rounded-[9999px] border-primary-500 text-primary-400',
                          Typography.TITLE_3
                        )}>
                        수강권 등록
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      className='m-auto mb-7 w-[calc(100%-20px)] rounded-lg px-7 pb-9 pt-8'
                      closeClassName='top-7 right-7'
                      xClassName='w-[22px] h-[22px] text-[#000]'
                      side='bottom'>
                      <SheetHeader>
                        <SheetTitle
                          className={cn(
                            cn('mb-8 text-left text-[#000]', Typography.HEADING_4)
                          )}>
                          등록할 수업 횟수
                        </SheetTitle>
                      </SheetHeader>
                      <div className='mb-8 text-center'>
                        <Input
                          type='number'
                          value={courseInput}
                          onChange={changeCourseInput}
                          className={cn(
                            'border-b-1 w-[100px] border-b border-solid border-y-gray-400 py-[2px] text-center text-[40px] font-bold leading-[130%] text-[#000] focus:border-y-primary-500',
                            courseInputError && 'focus:border-y-red-500'
                          )}
                        />
                        {courseInputError && (
                          <p className={cn('mt-[8px] text-[#FF4668]', Typography.BODY_4)}>
                            {courseInputError}
                          </p>
                        )}
                      </div>
                      <Button
                        className={cn('h-[52px] w-full', Typography.TITLE_1)}
                        disabled={courseInput === '' || Number(courseInput) > 500}
                        onClick={addCourseCount}>
                        수강권 등록
                      </Button>
                    </SheetContent>
                  </Sheet> */}
                </div>

                <div className='flex flex-col items-center justify-center pt-[124px]'>
                  <NotificationsIcon
                    width={37}
                    height={36}
                    fill='transparent'
                    stroke={'var(--gray-300)'}
                  />
                  <p className={cn('mt-5 text-gray-700', Typography.TITLE_1)}>
                    수강된 내역이 없습니다.
                  </p>
                </div>
              </>
            )}
          </>
        )}
        <CourseSheet>
          <CourseSheetTrigger>버튼</CourseSheetTrigger>

          <CourseSheetContent
            title='추가할 수업횟수'
            buttonText='수업 추가 횟수'
            courseInput={courseInput}
            setCourseInput={setCourseInput}
            courseInputError={courseInputError}
            setCourseInputError={setCourseInputError}
          />
        </CourseSheet>
      </Layout.Contents>
    </Layout>
  );
};
