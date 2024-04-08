'use client';

import { useRouter } from 'next/navigation';

import IconBack from '@/shared/assets/images/icon_back.svg';
import { Button, Layout, TextInput } from '@/shared/ui';

interface Props {
  memberId: string;
}

const StudentEditPage = ({ memberId }: Props) => {
  console.log('memberId', memberId);
  const router = useRouter();

  const handleRemoveStudent = () => {
    console.log(`Remove ${memberId} student`);
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
        <div className='typography-title-3 flex gap-x-[8px]'>
          <div className='flex flex-col gap-y-[8px]'>
            <p>이름</p>
            {/* TextInput typography 오버라이드 안됨 */}
            <TextInput className='typography-title-3 px-[16px] py-[11.5px]' />
          </div>
          <div className='flex flex-col gap-y-[8px]'>
            <p>수업 할 PT 횟수</p>
            <TextInput className='typography-title-3 px-[16px] py-[11.5px]' />
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
      <Layout.Footer>
        <Button variant='default' size='full' className='typography-title-1 font-bold'>
          수정 완료
        </Button>
      </Layout.Footer>
    </Layout>
  );
};

export { StudentEditPage };
