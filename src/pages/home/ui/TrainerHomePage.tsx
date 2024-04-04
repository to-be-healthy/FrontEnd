'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useAuthAction } from '@/entities/auth';
import IconAlarm from '@/shared/assets/images/icon_alarm.svg';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Layout,
  ScrollArea,
  ScrollBar,
} from '@/shared/ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'; //index에 추가하고 삭제
import { cn } from '@/shared/utils';

const GYM_LIST = [
  {
    name: '건강해짐 홍대점',
    id: 1,
  },
  {
    name: '건강해짐 떡잎마을점',
    id: 2,
  },
  {
    name: '건강해짐 당산점',
    id: 3,
  },
  {
    name: '건강해짐 울산점',
    id: 4,
  },
];

// TODO) 스케줄 관리 entity
const TODAY_CLASSES = [
  {
    name: '박지윤',
    date: '08:00',
    userId: 'A',
  },
  {
    name: '안서영',
    date: '09:00',
    userId: 'B',
  },
  {
    name: '김태주',
    date: '10:00',
    userId: 'C',
  },
  {
    name: '박혜민',
    date: '11:00',
    userId: 'D',
  },
  {
    name: '김진영',
    date: '12:00',
    userId: 'E',
  },
];

// TODO) 회원 관리 entity
const MEMBER_COUNT = 20;

export const TrainerHomePage = () => {
  const { deleteUserInfo } = useAuthAction();
  const router = useRouter();

  return (
    <Layout type='trainer'>
      <Layout.Header className='bg-white'>
        <Select defaultValue={'1'}>
          <SelectTrigger className='flex w-fit items-center gap-x-[4px]'>
            <SelectValue placeholder='헬스장 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {GYM_LIST.map((item) => (
                <SelectItem key={item.id} value={String(item.id)}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* 임시로 로그아웃 기능 적용 */}
        <Button
          variant='ghost'
          onClick={() => {
            deleteUserInfo();
            router.push('/');
          }}>
          <IconAlarm />
        </Button>
      </Layout.Header>
      <Layout.Contents>
        <div className=' flex w-full flex-col gap-y-5 bg-white py-6'>
          <div className='typography-heading-2 flex gap-x-2 px-5'>
            <p>오늘의 수업</p>
            <span className='text-primary-500'>{TODAY_CLASSES.length}</span>
          </div>
          <ScrollArea className='w-full whitespace-nowrap'>
            <div className='flex w-max space-x-2.5 px-5'>
              {TODAY_CLASSES.map((item) => {
                return (
                  <div
                    key={item.userId}
                    className={cn(
                      'h-50 w-[100px] rounded-[12px] border border-gray-300 px-[24px] py-[26px] shadow-point'
                    )}>
                    <p className={'typography-body-1 text-gray-400'}>{item.date}</p>
                    <p className={'typography-heading-4 font-bold text-gray-800'}>
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation='horizontal' className='hidden' />
          </ScrollArea>
        </div>
        <div className='mt-[19px] flex flex-col items-center px-[20px]'>
          <div className='grid grid-cols-2 gap-[10px]'>
            <Card
              className='h-[140px] w-[155px] cursor-pointer'
              onClick={() => router.push('/trainer/manage')}>
              <CardHeader>
                <p className='flex gap-x-[4px]'>
                  회원<span className='text-primary-500'>{MEMBER_COUNT}</span>
                </p>
              </CardHeader>
              <CardContent>
                <p>{`간편한 회원 관리와\n운동 일지 공유`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_profile_coin_shadow.png'
                    fill
                    sizes='auto'
                    priority
                    alt='Card image of account'
                  />
                </div>
              </CardContent>
            </Card>
            <Card className='h-[140px] w-[155px]'>
              <CardHeader>수업</CardHeader>
              <CardContent>
                <p>{`PT 일정을\n한눈에 조회!`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_calendar_shadow.png'
                    fill
                    sizes='auto'
                    alt='Calendar image for classes'
                  />
                </div>
              </CardContent>
            </Card>
            <Card className='h-[140px] w-[155px]'>
              <CardHeader>루틴</CardHeader>
              <CardContent>
                <p>{`운동 패턴을\n루틴으로 관리`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_dumbel_yellow.png'
                    fill
                    sizes='auto'
                    alt='Card image of dumbel'
                  />
                </div>
              </CardContent>
            </Card>
            <Card className='h-[140px] w-[155px]'>
              <CardHeader>급여</CardHeader>
              <CardContent>
                <p>{`쉽고 정확한\n급여 계산`}</p>
                <div className='absolute bottom-[13px] right-[8px] h-[60px] w-[60px]'>
                  <Image
                    src='/images/icon_pay_shadow.png'
                    fill
                    sizes='auto'
                    alt='Card image of salary'
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};
