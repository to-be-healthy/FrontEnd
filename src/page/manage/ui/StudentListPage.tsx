'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import {
  AddStudentDialog,
  RegisteredStudent,
  useRegisteredStudentsQuery,
} from '@/feature/member';
import IconArrowDownUp from '@/shared/assets/images/icon_arrow_down_up.svg';
import IconBack from '@/shared/assets/images/icon_back.svg';
import IconCircleAlert from '@/shared/assets/images/icon_circle_alert.svg';
import IconDefaultProfile from '@/shared/assets/images/icon_default_profile_small.svg';
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

import { profileBorderStyleMapper } from '../utils';

interface SortCondition<T> {
  label: string;
  condition: (a: T, b: T) => number;
}

const sortConditionMapper: Record<string, SortCondition<RegisteredStudent>> = {
  DEFAULT: {
    label: '기본 순',
    condition: (a, b) => a.memberId - b.memberId,
  },
  RANKING: {
    label: '랭킹 순',
    condition: (a, b) => a.ranking - b.ranking,
  },
};

const StudentListController = (students: RegisteredStudent[]) => ({
  search: (keyword: string) => {
    const searchedStudents = students.filter((student) =>
      student.name.includes(keyword.toLowerCase())
    );
    return StudentListController(searchedStudents);
  },
  sort: (condition: ((a: RegisteredStudent, b: RegisteredStudent) => number) | null) => {
    if (condition === null) return StudentListController(students);
    const sortedStudents = students.sort(condition);
    return StudentListController(sortedStudents);
  },
  get: () => students,
});

const StudentListPage = () => {
  const router = useRouter();
  const [sort, setSort] = useState(sortConditionMapper.DEFAULT);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: studentList, isLoading } = useRegisteredStudentsQuery();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const processedStudentList = StudentListController(studentList ?? [])
    .sort(sort.condition)
    .search(searchQuery)
    .get();

  const studentsCount = processedStudentList.length ?? 0;

  return (
    <Layout className='flex flex-col'>
      <Layout.Header className='bg-transparent'>
        <Button variant='ghost' size='icon' onClick={() => router.replace('/trainer')}>
          <IconBack />
        </Button>
        <h2 className='typography-heading-4 font-semibold'>나의 회원</h2>
        <AddStudentDialog />
      </Layout.Header>
      <Layout.Contents className='overflow-y-hidden'>
        <div className='flex h-full flex-col'>
          <div className='flex h-fit w-full px-[20px] py-[16px]'>
            <div className='flex h-fit w-full justify-between rounded-md bg-gray-200 px-[16px] py-[10px]'>
              <Button variant='ghost' size='icon' className='h-[20px] w-[20px]'>
                <IconSearch />
              </Button>
              {/* 공통 인풋 적용 예정 */}
              <input
                type='text'
                className='w-full bg-transparent px-5'
                onChange={handleSearchInput}
              />
            </div>
          </div>
          {!isLoading && (
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
                      className='typography-body-3 flex gap-x-[4px]'>
                      <IconArrowDownUp />
                      {sort.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='absolute -right-9 top-1 flex w-[96px] flex-col'>
                    <DropdownMenuGroup className='flex flex-col'>
                      {Object.values(sortConditionMapper).map((item) => (
                        <DropdownMenuItem
                          key={item.label}
                          className={cn(
                            'typography-title-3 px-[16px] py-[12px] text-gray-500',
                            item.label === sort.label && 'text-black'
                          )}
                          onClick={() => setSort(item)}>
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {studentList === null && (
                <div className='mb-[30%] flex h-full flex-col items-center justify-center gap-y-[36px]'>
                  <div className='flex flex-col items-center gap-y-[12px]'>
                    <IconCircleAlert />
                    <p className='text-[16px]/[130%] font-bold text-gray-700'>
                      등록된 회원이 없습니다.
                    </p>
                  </div>
                  <AddStudentDialog>
                    <Button
                      variant='default'
                      className='typography-title-3 flex h-[48px] w-[146px] items-center gap-x-[4px] px-[24px] py-[8px]'>
                      <IconPlus fill='white' />
                      회원 등록하기
                    </Button>
                  </AddStudentDialog>
                </div>
              )}
              {studentList !== null && processedStudentList.length === 0 && (
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
              {studentList !== null && processedStudentList.length > 0 && (
                <div className='flex w-full flex-col gap-y-[10px] pb-8'>
                  {processedStudentList.map((item) => {
                    return (
                      <Link key={item.memberId} href={`/trainer/manage/${item.memberId}`}>
                        <div className='flex justify-between rounded-lg bg-white px-[16px] py-[20px]'>
                          <div className='flex items-center gap-x-[16px]'>
                            <div className='relative'>
                              {item.fileUrl ? (
                                <Image
                                  width={32}
                                  height={32}
                                  src={item.fileUrl}
                                  alt='profile'
                                  className={profileBorderStyleMapper(item.ranking)}
                                />
                              ) : (
                                <IconDefaultProfile width={32} height={32} />
                              )}
                            </div>
                            <div className='flex flex-col gap-y-[4px]'>
                              <p className='typography-title-1 font-bold'>{item.name}</p>
                              {item.nickName ?? (
                                <span className='typography-body-4 text-gray-500'>
                                  {item.nickName}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className='flex items-center'>
                            <span className='typography-body-3 mr-[2px] text-primary-500'>
                              잔여
                            </span>
                            <span className='typography-title-3 text-primary-500'>
                              {item.remainLessonCnt}
                            </span>
                            <span className='typography-body-2 text-gray-400'>
                              /{item.lessonCnt}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </Layout.Contents>
    </Layout>
  );
};

export { StudentListPage };
