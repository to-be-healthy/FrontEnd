'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import IconArrowDownUp from '@/shared/assets/images/icon_arrow_down_up.svg';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCircleAlert from '@/shared/assets/images/icon_circle_alert.svg';
import IconPlus from '@/shared/assets/images/icon_plus.svg';
import IconSearch from '@/shared/assets/images/icon_search.svg';
import { Button, Layout } from '@/shared/ui';

interface Student {
  name: string;
  age: number | null;
  ticket_state: string | null;
  total_class: number | null;
  remain_class: number | null;
  ranking: number;
}

const STUDENT_LIST: Student[] = [];

// const STUDENT_LIST: Student[] = [
//   {
//     name: '박지윤',
//     age: 20,
//     ticket_state: '1개월 후 만료',
//     total_class: 20,
//     remain_class: 4,
//     ranking: 1,
//   },
//   {
//     name: '김진영',
//     age: 20,
//     ticket_state: '1개월 후 만료',
//     total_class: 20,
//     remain_class: 4,
//     ranking: 2,
//   },
// ];

const StudentListPage = () => {
  const router = useRouter();
  const [sort] = useState<keyof typeof sortCondition>('default');

  const sortCondition = {
    default: () => 0,
    ranking: (a: Student, b: Student) => b.ranking - a.ranking,
  };

  const addStudent = () => {
    console.log('Add member');
  };

  const changeAlignment = () => {
    console.log('정렬 순서');
  };

  const sortedStudentList = STUDENT_LIST.sort(sortCondition[sort]);

  return (
    <Layout type={null} className='flex flex-col'>
      <header className='typography-heading-4 flex h-14 items-center justify-between px-[20px] py-[16px]'>
        <Button variant='ghost' size='icon' onClick={() => router.replace('/trainer')}>
          <IconBack />
        </Button>
        <h2 className='font-semibold'>나의 회원</h2>
        <Button variant='ghost' size='icon' onClick={addStudent}>
          <IconPlus />
        </Button>
      </header>
      <div className='flex w-full px-[20px] py-[16px]'>
        <div className='flex w-full justify-between rounded-md bg-gray-200 px-[16px] py-[10px]'>
          <input type='text' className='w-full bg-transparent px-5' />
          <Button variant='ghost' size='icon' className='h-[20px] w-[20px]'>
            <IconSearch />
          </Button>
        </div>
      </div>
      <div className='mt-[4px] flex flex-grow flex-col px-[20px]'>
        <div className='mb-[10px] flex items-center justify-between'>
          <p className='typography-body-2'>
            총{' '}
            <span className='typography-title-3 text-primary-500'>
              {sortedStudentList.length ?? 0}
            </span>
            명
          </p>
          <div>
            <Button
              variant='ghost'
              className='typography-body-3 flex gap-x-[4px]'
              onClick={changeAlignment}>
              <IconArrowDownUp />
              랭킹 순
            </Button>
          </div>
        </div>
        <div className='mb-[30%] flex h-full flex-col items-center justify-center'>
          {sortedStudentList.length === 0 && (
            <div className='flex flex-col items-center gap-y-[36px]'>
              <div className='flex flex-col items-center gap-y-[12px]'>
                <IconCircleAlert />
                <p className='text-[16px]/[130%] font-bold text-gray-800'>
                  등록된 회원이 없습니다.
                </p>
              </div>
              <Button
                variant='default'
                className='typography-title-3 flex h-[48px] w-[146px] items-center gap-x-[4px] px-[24px] py-[8px]'>
                <IconPlus fill='white' />
                회원 등록하기
              </Button>
            </div>
          )}
          {sortedStudentList.length > 0 && (
            <div className='flex h-full w-full flex-col'>
              <div className='flex h-[20px] w-full items-center rounded-lg bg-white px-[16px] py-[20px]'>
                진행 중
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export { StudentListPage };
