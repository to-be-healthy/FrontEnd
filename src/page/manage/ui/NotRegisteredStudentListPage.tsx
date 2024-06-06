'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import { Member, useNotRegisteredStudentsQuery } from '@/feature/member';
import { IconAlertCircle } from '@/shared/assets';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import IconSearch from '@/shared/assets/images/icon_search.svg';
import { Typography } from '@/shared/mixin';
import { Button, Card } from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

const MemberListController = (students: Member[]) => ({
  search: (keyword: string) => {
    const searchedStudents = students.filter((student) =>
      student.name.includes(keyword.toLowerCase())
    );
    return MemberListController(searchedStudents);
  },
  get: () => students,
});

export const NotRegisteredStudentListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isPending } = useNotRegisteredStudentsQuery();

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const processedMemberList = MemberListController(data ?? [])
    .search(searchQuery)
    .get();

  return (
    <Layout>
      <Layout.Header>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
        <h1 className={cn(Typography.HEADING_4_SEMIBOLD)}>건강하짐 홍대점</h1>
        <Button
          variant='outline'
          className='border-none bg-transparent p-0 hover:bg-transparent'
          asChild>
          <Link href={'/trainer/manage'}>
            <CloseIcon width={20} height={20} />
          </Link>
        </Button>
      </Layout.Header>
      <Layout.Contents className='flex h-full flex-col px-[20px] pb-[16px]'>
        <div className='flex h-fit w-full py-[16px]'>
          <div className='flex h-fit w-full justify-between rounded-md bg-gray-200 px-[16px] py-[10px]'>
            <Button variant='ghost' size='icon' className='h-[20px] w-[20px]'>
              <IconSearch />
            </Button>
            {/* 공통 인풋 적용 예정 */}
            <input
              type='text'
              className='w-full bg-transparent px-5'
              placeholder='이름 검색'
              onChange={handleSearchInput}
            />
          </div>
        </div>
        {!isPending && processedMemberList.length === 0 && (
          <div className='flex h-full flex-col items-center justify-center'>
            <div className='mb-[30%] flex h-full flex-col items-center justify-center'>
              <div className='flex flex-col items-center gap-y-[36px]'>
                <div className='flex flex-col items-center gap-y-[12px]'>
                  <IconAlertCircle />
                  <p className='text-[16px]/[130%] font-bold text-gray-500'>
                    {data === null ? '등록된 회원이 없습니다.' : '검색 결과가 없습니다.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isPending &&
          processedMemberList.length !== 0 &&
          processedMemberList.map(({ name, id, email }) => (
            <Card
              key={id}
              className='my-[4px] flex w-full flex-row items-center justify-between px-[16px] py-[20px]'>
              <div className='flex flex-col gap-y-[4px]'>
                <p className={Typography.TITLE_1_BOLD}>{name}</p>
                <span className={cn(Typography.BODY_4_REGULAR, 'text-gray-400')}>
                  {email}
                </span>
              </div>
              <Button variant='secondary' className='px-[36px] py-[6px]' asChild>
                <Link
                  href={{
                    pathname: `/trainer/manage/append/${id}`,
                    query: { name: name },
                  }}>
                  추가
                </Link>
              </Button>
            </Card>
          ))}
      </Layout.Contents>
    </Layout>
  );
};
