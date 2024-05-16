'use client';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
  CourseSheet,
  CourseSheetContent,
  CourseSheetFooter,
  CourseSheetHeader,
  CourseSheetInput,
  CourseSheetTrigger,
} from '@/feature/manage/ui/CourseBottomSheet';
import {
  CourseCard,
  CourseCardContent,
  CourseCardHeader,
  courseHistoryCodeDescription,
  useAddStudentCourseMutation,
  useDeleteStudentCourseMutation,
  useRegisterStudentCourseMutation,
  useStudentCourseDetailQuery,
} from '@/feature/member';
import { IconPlus } from '@/shared/assets';
import { IconCheck } from '@/shared/assets';
import BackIcon from '@/shared/assets/images/icon_back.svg';
import NotificationsIcon from '@/shared/assets/images/icon_notifications.svg';
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
  Layout,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
interface Props {
  memberId: number;
}

const ITEMS_PER_PAGE = 20;
const REMAIN_CNT_ZERO = 0;

export const StudentCourseDetailPage = ({ memberId }: Props) => {
  const { toast } = useToast();
  const params = useSearchParams();
  const name = params.get('name');

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isRegisterSheetOpen, setIsRegisterSheetOpen] = useState(false);
  const [addInput, setAddInput] = useState('');
  const [RegisterInput, setRegisterInput] = useState('');

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

  const studentCourseId = Number(detailData?.pages[0]?.course?.courseId);

  const { mutate: addMutation } = useAddStudentCourseMutation();
  const { mutate: deleteMutation } = useDeleteStudentCourseMutation();
  const { mutate: RegisterMutation } = useRegisterStudentCourseMutation();

  const RegisterCourseCount = () => {
    RegisterMutation(
      {
        memberId: memberId,
        lessonCnt: Number(RegisterInput),
      },
      {
        onSuccess: (reslut) => {
          setIsRegisterSheetOpen(false);
          void queryClient.invalidateQueries({
            queryKey: ['studentCourseDetail'],
          });
          return toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>{reslut.message}</p>
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
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>
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

  const addCourseCount = () => {
    addMutation(
      {
        courseId: studentCourseId,
        memberId: memberId,
        calculation: 'PLUS',
        type: 'PLUS_CNT',
        updateCnt: addInput,
      },
      {
        onSuccess: () => {
          setIsAddSheetOpen(false);
          void queryClient.invalidateQueries({
            queryKey: ['studentCourseDetail'],
          });
          return toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>
                  {addInput}회가 연장되었습니다.
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
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>
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

  const deleteStudentCourse = () => {
    deleteMutation(studentCourseId, {
      onSuccess: (result) => {
        void queryClient.invalidateQueries({
          queryKey: ['studentCourseDetail'],
        });
        return toast({
          className: 'h-12',
          description: (
            <div className='flex items-center justify-center'>
              <IconCheck fill={'var(--primary-500)'} />
              <p className='typography-heading-5 ml-6 text-[#fff]'>{result.message}</p>
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
              <IconCheck fill={'var(--primary-500)'} />
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

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['studentCourseDetail'] });
    };
  }, [queryClient]);

  return (
    <Layout type='trainer'>
      <Layout.Header className='relative flex justify-center bg-[#fff]'>
        <Link href='./' className='absolute left-7'>
          <BackIcon />
        </Link>
        <h2>{name}님 수강권</h2>
        {detailData?.pages[0]?.course?.remainLessonCnt === REMAIN_CNT_ZERO && (
          <CourseSheet isOpen={isRegisterSheetOpen} setIsOpen={setIsRegisterSheetOpen}>
            <CourseSheetTrigger className='absolute right-7'>
              <IconPlus width={20} height={20} fill='black' />
            </CourseSheetTrigger>
            <CourseSheetContent>
              <CourseSheetHeader>등록할 수업횟수</CourseSheetHeader>
              <CourseSheetInput
                courseInput={RegisterInput}
                setCourseInput={setRegisterInput}
                isOpen={isRegisterSheetOpen}
              />
              <CourseSheetFooter
                courseInput={RegisterInput}
                clickButtonHandler={RegisterCourseCount}>
                수강권 등록
              </CourseSheetFooter>
            </CourseSheetContent>
          </CourseSheet>
        )}
      </Layout.Header>
      <Layout.Contents>
        {isPending ? (
          <div className='loading'>Loading..</div>
        ) : (
          <>
            {detailData?.pages[0]?.course ? (
              <>
                <div className='bg-[#fff] p-7 pt-6'>
                  <CourseCard
                    key={detailData?.pages[0]?.course?.courseId}
                    className={cn(
                      'gap-y-11',
                      detailData?.pages[0]?.course?.remainLessonCnt === REMAIN_CNT_ZERO &&
                        'bg-gray-500'
                    )}>
                    <CourseCardHeader
                      gymName={detailData?.pages[0]?.gymName}
                      remainLessonCnt={detailData?.pages[0]?.course?.remainLessonCnt}
                      totalLessonCnt={detailData?.pages[0]?.course?.totalLessonCnt}
                      expiration={detailData?.pages[0]?.course?.remainLessonCnt === 0}
                    />
                    <CourseCardContent
                      className={cn(
                        detailData?.pages[0]?.course?.remainLessonCnt ===
                          REMAIN_CNT_ZERO && 'text-gray-300'
                      )}
                      progressClassName={cn(
                        detailData?.pages[0]?.course?.remainLessonCnt ===
                          REMAIN_CNT_ZERO && 'bg-gray-400'
                      )}
                      totalLessonCnt={detailData?.pages[0]?.course?.totalLessonCnt}
                      remainLessonCnt={detailData?.pages[0]?.course?.remainLessonCnt}
                    />
                  </CourseCard>
                </div>

                <div className='bg-[#fff] p-7 pt-0'>
                  <div className='flex items-center justify-center rounded-lg bg-gray-100 text-black'>
                    <CourseSheet isOpen={isAddSheetOpen} setIsOpen={setIsAddSheetOpen}>
                      <CourseSheetTrigger
                        className={cn('h-[46px] w-[160px]', Typography.HEADING_5)}
                        disabled={
                          detailData?.pages[0]?.course?.remainLessonCnt ===
                          REMAIN_CNT_ZERO
                        }>
                        수업 횟수 추가
                      </CourseSheetTrigger>
                      <CourseSheetContent>
                        <CourseSheetHeader>추가할 수업횟수</CourseSheetHeader>
                        <CourseSheetInput
                          courseInput={addInput}
                          setCourseInput={setAddInput}
                          isOpen={isAddSheetOpen}
                        />
                        <CourseSheetFooter
                          courseInput={addInput}
                          clickButtonHandler={addCourseCount}>
                          수업 횟수 추가
                        </CourseSheetFooter>
                      </CourseSheetContent>
                    </CourseSheet>

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

                <div className='bg-[#fff] px-7 pb-3 text-right'>
                  <Sheet>
                    <SheetTrigger className={cn('text-gray-700', Typography.BODY_2)}>
                      월 선택
                    </SheetTrigger>
                    <SheetContent side='bottom'>
                      <SheetHeader>월 선택하기</SheetHeader>
                    </SheetContent>
                  </Sheet>
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
                            <dd className='typography-title-3 text-black'>
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
                  <CourseSheet
                    isOpen={isRegisterSheetOpen}
                    setIsOpen={setIsRegisterSheetOpen}>
                    <CourseSheetTrigger
                      className={cn(
                        'flex h-[37px] w-[112px] items-center justify-center rounded-[9999px] border border-primary-500 text-primary-500',
                        Typography.TITLE_3
                      )}>
                      수강권 등록
                    </CourseSheetTrigger>
                    <CourseSheetContent>
                      <CourseSheetHeader>등록할 수업횟수</CourseSheetHeader>
                      <CourseSheetInput
                        courseInput={RegisterInput}
                        setCourseInput={setRegisterInput}
                        isOpen={isRegisterSheetOpen}
                      />
                      <CourseSheetFooter
                        courseInput={RegisterInput}
                        clickButtonHandler={RegisterCourseCount}>
                        수강권 등록
                      </CourseSheetFooter>
                    </CourseSheetContent>
                  </CourseSheet>
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
      </Layout.Contents>
    </Layout>
  );
};
