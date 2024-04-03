'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import IconArrowDownUp from '@/shared/assets/images/icon_arrow_down_up.svg';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCircleAlert from '@/shared/assets/images/icon_circle_alert.svg';
import IconMedalBronze from '@/shared/assets/images/icon_medal_bronze.svg';
import IconMedalGold from '@/shared/assets/images/icon_medal_gold.svg';
import IconMedalNormal from '@/shared/assets/images/icon_medal_normal.svg';
import IconMedalSilver from '@/shared/assets/images/icon_medal_silver.svg';
import IconPlus from '@/shared/assets/images/icon_plus.svg';
import IconSearch from '@/shared/assets/images/icon_search.svg';
import { Button, Layout } from '@/shared/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { cn } from '@/shared/utils';

interface Student {
  name: string;
  age: number | null;
  ticket_state: string | null;
  total_class: number | null;
  remain_class: number | null;
  ranking: number;
  id: number;
}

// const STUDENT_LIST: Student[] = [];
const STUDENT_LIST: Student[] = [
  {
    name: '박지윤',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 2,
    id: 1,
  },
  {
    name: '박혜민',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 1,
    id: 2,
  },
  {
    name: '박은채',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 3,
    id: 3,
  },
  {
    name: '구진실',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 4,
    id: 4,
  },
  {
    name: '박성재',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 8,
    id: 8,
  },
  {
    name: '정빛나',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 6,
    id: 6,
  },
  {
    name: '송하영',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 11,
    id: 11,
  },
  {
    name: '정선우',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 7,
    id: 7,
  },
  {
    name: '임채린',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 5,
    id: 5,
  },
  {
    name: '박유진',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 10,
    id: 10,
  },
  {
    name: '김문영',
    age: 20,
    ticket_state: '1개월 후 만료',
    total_class: 20,
    remain_class: 4,
    ranking: 9,
    id: 9,
  },
];

const sortCondition = {
  '기본 순': (a: Student, b: Student) => a.id - b.id,
  '랭킹 순': (a: Student, b: Student) => a.ranking - b.ranking,
};

const StudentListController = (students: Student[]) => ({
  search: (keyword: string) => {
    const searchedStudents = students.filter((student) =>
      student.name.includes(keyword.toLowerCase())
    );
    return StudentListController(searchedStudents);
  },
  sort: (condition: ((a: Student, b: Student) => number) | null) => {
    if (condition === null) return StudentListController(students);

    const sortedStudents = students.sort(condition);
    return StudentListController(sortedStudents);
  },
  get: () => students,
});

const medalMapper = (ranking: number) => {
  if (ranking === 1) return <IconMedalGold />;
  if (ranking === 2) return <IconMedalSilver />;
  if (ranking === 3) return <IconMedalBronze />;
  return <IconMedalNormal />;
};

const StudentListPage = () => {
  const router = useRouter();
  const [sort, setSort] = useState<keyof typeof sortCondition>('랭킹 순');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const addStudent = () => {
    console.log('Add member');
  };

  const changeAlignment = () => {
    console.log('정렬 순서');
  };

  const processedStudentList = StudentListController(STUDENT_LIST)
    .sort(sortCondition[sort])
    .search(searchQuery)
    .get();

  const studentsCount = processedStudentList ? processedStudentList.length ?? 0 : 0;

  return (
    <Layout className='flex flex-col'>
      <Layout.Header className='bg-transparent'>
        <Button variant='ghost' size='icon' onClick={() => router.replace('/trainer')}>
          <IconBack />
        </Button>
        <h2 className='font-semibold'>나의 회원</h2>
        <Button variant='ghost' size='icon' onClick={addStudent}>
          <IconPlus />
        </Button>
      </Layout.Header>
      <Layout.Contents className='overflow-y-hidden'>
        <div className='flex h-full flex-col'>
          <div className='flex h-fit w-full px-[20px] py-[16px]'>
            <div className='flex h-fit w-full justify-between rounded-md bg-gray-200 px-[16px] py-[10px]'>
              {/* 공통 인풋 적용 예정 */}
              <input
                type='text'
                className='w-full bg-transparent px-5'
                onChange={handleSearchInput}
              />
              <Button variant='ghost' size='icon' className='h-[20px] w-[20px]'>
                <IconSearch />
              </Button>
            </div>
          </div>
          <div className='mt-[4px] flex h-full flex-1 flex-grow flex-col overflow-y-auto px-[20px]'>
            <div className='mb-[10px] flex items-center justify-between'>
              <p className='typography-body-2'>
                총{' '}
                <span className='typography-title-3 text-primary-500'>
                  {studentsCount}
                </span>
                명
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='typography-body-3 flex gap-x-[4px]'
                    onClick={changeAlignment}>
                    <IconArrowDownUp />
                    {sort}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='absolute -right-9 top-1 flex w-[96px] flex-col'>
                  <DropdownMenuGroup className='flex flex-col'>
                    {Object.keys(sortCondition).map((item) => (
                      <DropdownMenuItem
                        key={item}
                        className={cn(
                          'typography-title-3 px-[16px] py-[12px] text-gray-500',
                          item === sort && 'text-black'
                        )}
                        onClick={() => setSort(item as keyof typeof sortCondition)}>
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {STUDENT_LIST.length === 0 && (
              <div className='mb-[30%] flex h-full flex-col items-center justify-center gap-y-[36px]'>
                <div className='flex flex-col items-center gap-y-[12px]'>
                  <IconCircleAlert />
                  <p className='text-[16px]/[130%] font-bold text-gray-700'>
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
            {STUDENT_LIST.length > 0 && processedStudentList.length === 0 && (
              <div className='mb-[30%] flex h-full flex-col items-center justify-center'>
                <div className='mb-[30%] flex h-full flex-col items-center justify-center'>
                  <div className='flex flex-col items-center gap-y-[36px]'>
                    <div className='flex flex-col items-center gap-y-[12px]'>
                      <IconCircleAlert />
                      <p className='text-[16px]/[130%] font-bold text-gray-500'>
                        검색 결과가 없습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {STUDENT_LIST.length > 0 && processedStudentList.length > 0 && (
              <div className='flex w-full flex-col gap-y-[10px] pb-8'>
                {processedStudentList.map((item) => {
                  const medal = medalMapper(item.ranking);
                  return (
                    <div
                      key={item.id}
                      className='flex justify-between rounded-lg bg-white px-[16px] py-[20px]'>
                      <div className='flex items-center gap-x-[16px]'>
                        <div className='relative'>
                          {medal}
                          <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white'>
                            {item.ranking}
                          </span>
                        </div>
                        <div className='flex flex-col gap-y-[4px]'>
                          <p className='typography-title-1 font-bold'>{item.name}</p>
                          <span className='typography-body-4 text-gray-500'>
                            {item.ticket_state}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <span className='typography-body-3 mr-[2px] text-primary-500'>
                          잔여
                        </span>
                        <span className='typography-title-3 text-primary-500'>
                          {item.remain_class}
                        </span>
                        <span className='typography-body-2 text-gray-400'>
                          /{item.total_class}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Layout.Contents>
    </Layout>
  );
};

export { StudentListPage };
