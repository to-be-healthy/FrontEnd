'use client';

import { useRouter } from 'next/navigation';

import IconBack from '@/shared/assets/images/icon_back.svg';
import { Button, Input, Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  memberId: string;
}

const StudentEditPage = ({ memberId }: Props) => {
  console.log('memberId', memberId);
  const router = useRouter();

  const handleRemoveStudent = () => {
    console.log(`Remove ${memberId} student`);
  };

  // TODO) react-hook-form
  const handleEditStudentDetail = () => {
    console.log('Edit student info');
  };

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.replace(`/trainer/manage/${memberId}`)}>
          <IconBack />
        </Button>
        <h2 className='typography-heading-4 font-semibold'>회원 정보 수정</h2>
        <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1} />
      </Layout.Header>
      <Layout.Contents className='mt-[36px] flex flex-col gap-y-[36px] px-[20px]'>
        <div className='typography-title-3 flex justify-center gap-x-[8px]'>
          <div className='flex flex-col gap-y-[8px]'>
            <p>이름</p>
            {/* TODO) 컴포넌트 병합 필요 - Custom Input */}
            <div
              className={cn(
                'flex rounded-md border border-gray-200 bg-white px-[16px] py-[11.5px] focus-within:border-primary-500'
              )}>
              <Input className='w-full text-title-3' />
            </div>
          </div>
          <div className='flex flex-col gap-y-[8px]'>
            <p>수업 할 PT 횟수</p>
            {/* TODO) 컴포넌트 병합 필요 - Custom Input with inner unit */}
            <div
              className={cn(
                'flex gap-x-[10px] rounded-md border border-gray-200 bg-white px-[16px] py-[11.5px] focus-within:border-primary-500'
              )}>
              <Input type='number' className='no-spin w-full text-title-3' />
              <div className='right-[16px] text-body-3 text-gray-500'>회</div>
            </div>
          </div>
        </div>
        <Button
          variant='outline'
          size='full'
          className='border-[2px] border-gray-200 py-[12px] text-point'
          onClick={handleRemoveStudent}>
          회원 삭제하기
        </Button>
      </Layout.Contents>
      <Layout.BottomArea>
        <Button
          variant='default'
          size='full'
          className='typography-title-1 font-bold'
          onClick={handleEditStudentDetail}>
          수정 완료
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};

export { StudentEditPage };
