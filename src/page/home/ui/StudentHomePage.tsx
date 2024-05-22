'use client';

import 'dayjs/locale/ko';
dayjs.locale('ko');
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

import {
  CourseCard,
  CourseCardContent,
  CourseCardHeader,
  useStudentHomeDataQuery,
} from '@/feature/member';
import {
  IconAlarm,
  IconArrowDown,
  IconArrowFilledDown,
  IconArrowFilledUp,
  IconArrowRightSmall,
  IconAvatar,
  IconCheck,
  IconLogo,
  IconPoint,
} from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import {
  Card,
  CardContent,
  CardHeader,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const FEEDBACK_COUNT = 1;

export const StudentHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending } = useStudentHomeDataQuery();
  // const { mutate: dietMutate } = useRegisterDietMutation();

  // const [images, setImages] = useState([]);

  //식단 api 완료후 진행예정
  // const uploadFiles = (e: ChangeEvent<HTMLInputElement>) => {
  //   const uploadFiles = e.target.files;
  //   if (!uploadFiles) return;
  //   setImages(uploadFiles);

  // dietMutate(
  //   {
  //     type: type,
  //     file: file,
  //     fast: fast,
  //   },
  //   {
  //     onSuccess: ({ message }) => {
  //       console.log(message);
  //     },
  //     onError: (error) => {
  //       console.log(error?.response?.data.message);
  //     },
  //   }
  // );
  // };

  const toggleArrow = () => {
    setIsOpen((prev) => !prev);
  };

  const nextScheduledDay = data?.myReservation
    ? dayjs(data?.myReservation?.lessonDt).format('MM.DD (ddd)')
    : '';
  const nextScheduledHour = data?.myReservation
    ? dayjs(data?.myReservation?.lessonStartTime, 'HH:mm:ss').format('A hh:mm')
    : '';

  return (
    <Layout type='student'>
      <Layout.Header>
        <IconLogo width='44px' height='44px' />
        <Link href='#'>
          <IconAlarm />
        </Link>
      </Layout.Header>
      <Layout.Contents className='p-7 pt-6'>
        {isPending ? (
          <span>로딩중...</span>
        ) : (
          <>
            <article className='mb-7'>
              {/* 수강권 있을때 */}
              {data?.course && (
                <CourseCard
                  expiration={
                    data.course?.completedLessonCnt === data.course?.totalLessonCnt
                  }>
                  <Link href='./student/course-history'>
                    <CourseCardHeader
                      gymName={data?.gym.name}
                      totalLessonCnt={data?.course.totalLessonCnt}
                      remainLessonCnt={data?.course.remainLessonCnt}
                      completedLessonCnt={data?.course.completedLessonCnt}
                    />
                    <CourseCardContent
                      totalLessonCnt={data?.course.totalLessonCnt}
                      completedLessonCnt={data?.course.completedLessonCnt}
                      progressClassName={cn(
                        data?.course.completedLessonCnt === data?.course.totalLessonCnt &&
                          'bg-gray-400'
                      )}
                    />
                  </Link>
                  {data?.course.remainLessonCnt > 0 ? (
                    <Collapsible className='rounded-bl-lg rounded-br-lg bg-primary-600'>
                      <CollapsibleTrigger
                        className='w-full text-white'
                        onClick={toggleArrow}>
                        <div className='flex items-center justify-between p-6'>
                          <p className={cn(Typography.HEADING_5)}>
                            {data?.point.searchDate.split('-')[1].split('')[1]}월 활동
                            포인트
                          </p>
                          <div
                            className={cn(
                              Typography.TITLE_1,
                              'flex items-center justify-center'
                            )}>
                            {isOpen ? (
                              <IconArrowDown
                                widht={14}
                                height={14}
                                className='rotate-180'
                              />
                            ) : (
                              <>
                                <p className='mr-2 flex items-center justify-center'>
                                  <IconPoint />
                                  <span className='ml-[3px]'>
                                    {data?.point.monthPoint}
                                  </span>
                                </p>
                                <IconArrowDown widht={14} height={14} />
                              </>
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className='p-6 pt-3'>
                        <ul className='flex'>
                          <li className='w-[130px]'>
                            <Link href='./student/point-history'>
                              <Card className='h-full w-full gap-y-7 p-6'>
                                <CardHeader>
                                  <p
                                    className={cn(
                                      Typography.HEADING_5,
                                      'flex items-center justify-start text-black'
                                    )}>
                                    <IconPoint />
                                    이번달 포인트
                                  </p>
                                </CardHeader>
                                <CardContent>
                                  <p
                                    className={cn(
                                      Typography.HEADING_2,
                                      'mb-7 flex items-center text-black'
                                    )}>
                                    {data?.point.monthPoint}
                                    <span
                                      className={cn(
                                        Typography.HEADING_5,
                                        'ml-[2px] text-gray-700'
                                      )}>
                                      점
                                    </span>
                                  </p>
                                  <span
                                    className={cn(Typography.BODY_4, 'text-gray-400')}>
                                    누적 {data?.point.totalPoint}
                                  </span>
                                </CardContent>
                              </Card>
                            </Link>
                          </li>
                          <li className='ml-3 w-[130px]'>
                            <Card className='h-full w-full gap-y-7 p-6'>
                              <CardHeader>
                                <p
                                  className={cn(
                                    Typography.HEADING_5,
                                    'flex items-center justify-start text-black'
                                  )}>
                                  랭킹
                                </p>
                              </CardHeader>
                              <CardContent>
                                <p
                                  className={cn(
                                    Typography.HEADING_2,
                                    'mb-7 flex items-center text-black'
                                  )}>
                                  {data?.rank.ranking}
                                  <span
                                    className={cn(
                                      Typography.HEADING_5,
                                      'ml-[2px] mr-1 text-gray-700'
                                    )}>
                                    위
                                  </span>
                                  {data?.rank?.ranking ===
                                  data?.rank?.lastMonthRanking ? (
                                    ''
                                  ) : data?.rank &&
                                    data?.rank.ranking > data?.rank.lastMonthRanking ? (
                                    <IconArrowFilledDown fill='var(--primary-500)' />
                                  ) : (
                                    <IconArrowFilledUp fill='var(--point-color)' />
                                  )}
                                </p>
                                <span className={cn(Typography.BODY_4, 'text-gray-400')}>
                                  총 {data?.rank.totalMemberCnt}명
                                </span>
                              </CardContent>
                            </Card>
                          </li>
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <div className='w-full rounded-bl-lg rounded-br-lg bg-gray-400 text-white'>
                      <div className='flex items-center justify-between p-6'>
                        <p className={cn(Typography.HEADING_5)}>
                          {data?.point.searchDate.split('-')[1].split('')[1]}월 활동
                          포인트
                        </p>
                        <div
                          className={cn(
                            Typography.TITLE_1,
                            'flex items-center justify-center'
                          )}>
                          <p className='mr-2 flex items-center justify-center'>
                            <IconPoint />
                            <span className='ml-[3px]'>{data?.point.monthPoint}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CourseCard>
              )}

              {/* 수강권 없을때 */}
              {!data?.course && (
                <div
                  className={cn(
                    Typography.TITLE_3,
                    'flex h-[127px] w-full items-center justify-center rounded-lg bg-gray-500 text-white'
                  )}>
                  현재 등록된 수강권이 없습니다.
                </div>
              )}
            </article>

            <article className='mb-7'>
              {data?.myReservation && (
                <Card className='w-full gap-y-8 px-6 py-7'>
                  <CardHeader className='flex items-center justify-between'>
                    <h2 className={cn(Typography.TITLE_2, 'text-gray-800')}>
                      다음 PT예정일
                    </h2>
                    <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                      예약전체
                    </Link>
                  </CardHeader>
                  <CardContent className='flex items-center justify-start'>
                    <IconCheck fill={'var(--primary-500)'} />
                    <p className={cn(Typography.HEADING_4_BOLD, 'ml-3 text-black')}>
                      {nextScheduledDay} {nextScheduledHour}
                    </p>
                  </CardContent>
                </Card>
              )}
            </article>

            {data?.lessonHistory && (
              <article className='mb-7'>
                <Card className='w-full gap-y-8 px-6 py-7'>
                  <CardHeader className='flex items-center justify-between'>
                    <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>
                      수업 일지
                      <span
                        className={cn(
                          Typography.HEADING_5,
                          'ml-1 inline-block h-7 w-7 rounded-[50%] bg-primary-500 text-center text-[#fff]'
                        )}>
                        {FEEDBACK_COUNT}
                        {/* todo: 수업 전체에 들어가서 보는순간 없어짐..? */}
                      </span>
                    </h2>
                    <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                      수업전체
                    </Link>
                  </CardHeader>
                  <CardContent className='flex items-start justify-start'>
                    <IconAvatar width={28} height={28} />
                    <div className='ml-2 w-full overflow-hidden rounded-lg rounded-tl-none bg-gray-100 p-6'>
                      <p className={cn(Typography.BODY_4, 'line-clamp-2 text-black')}>
                        {data?.lessonHistory.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </article>
            )}

            <article className='mb-7'>
              <Card className='w-full gap-y-8 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>오늘 식단</h2>
                  <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                    식단전체
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center justify-between'>
                    {/* 식단 post -> response : url, 컴포넌트분리 */}
                    {/* {data?.diet.breakfast?.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='h-full min-h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : data?.diet.breakfast.dietFile ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={data?.diet.breakfast.dietFile.fileUrl}
                          width={60}
                          height={60}
                          alt='breackfast'
                          className='custom-image flex items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <button className='flex h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )} */}

                    {/* {data?.diet.lunch?.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='min-h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : data?.diet.lunch.dietFile ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={data?.diet.lunch.dietFile.fileUrl}
                          width={60}
                          height={95}
                          alt='lunch'
                          className='custom-image flex min-h-[95px] items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Button
                          variant='ghost'
                          className='flex min-h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </Button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}
                          // onClick={() =>
                          //   uploadFiles(
                          //     'LUNCH',
                          //     data?.diet.lunch.fast,
                          //     data?.diet.lunch.fast
                          //   )
                          // }
                        >
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )} */}

                    {/* {data?.diet.dinner.fast ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <div className='min-h-[95px] w-full rounded-md bg-gray-100'></div>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--primary-500)'} />
                          </span>
                        </Button>
                      </div>
                    ) : data?.diet.dinner.dietFile ? (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <Image
                          src={data?.diet.dinner.dietFile.fileUrl}
                          width={60}
                          height={60}
                          alt='dinner'
                          className='custom-image flex min-h-[95px] items-center justify-center rounded-md'
                        />
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    ) : (
                      <div className='w-[calc((100%-12px)/3)]'>
                        <button className='flex min-h-[95px] w-full items-center justify-center rounded-md bg-gray-100'>
                          <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
                        </button>
                        <Button
                          variant='ghost'
                          className={cn(
                            Typography.TITLE_2,
                            'text-Gray-400 mt-3 flex h-auto w-full items-center justify-center p-0 text-center'
                          )}>
                          단식
                          <span className='ml-1'>
                            <IconCheck fill={'var(--gray-400)'} />
                          </span>
                        </Button>
                      </div>
                    )} */}
                  </div>
                </CardContent>
              </Card>
            </article>

            <article>
              <Card className='w-full gap-y-8 px-6 py-7'>
                <CardHeader className='flex items-center justify-between'>
                  <h2 className={cn(Typography.TITLE_1_BOLD, 'text-black')}>
                    개인 운동 기록
                  </h2>
                  <Link href='/' className={cn(Typography.BODY_3, 'gray-500 h-auto')}>
                    <IconArrowRightSmall />
                  </Link>
                </CardHeader>
              </Card>
            </article>
          </>
        )}
      </Layout.Contents>
    </Layout>
  );
};
