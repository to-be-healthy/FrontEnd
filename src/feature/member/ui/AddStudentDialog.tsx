import Link from 'next/link';

import { IconPlus } from '@/shared/assets';
import CloseIcon from '@/shared/assets/images/icon_close.svg';
import IconMail from '@/shared/assets/images/icon_mail.svg';
import IconPeopleAdd from '@/shared/assets/images/icon_people_add.svg';
import { Button } from '@/shared/ui';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/shared/ui/dialog';
import { Layout } from '@/widget';

export const AddStudentDialog = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant='ghost' className='h-[20px] w-[20px]' size='icon'>
            <IconPlus fill='black' width={17} height={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='top-0 max-w-[var(--max-width)] translate-y-0 p-0'>
        <Layout.Header className='flex-row-reverse'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='border-none bg-transparent p-0 hover:bg-transparent'>
              <CloseIcon width={20} height={20} />
            </Button>
          </DialogClose>
          <h1 className='typography-heading-4 font-semibold'>회원추가</h1>
          <div className='w-[40px] cursor-default bg-transparent' tabIndex={-1}></div>
        </Layout.Header>
        <Layout.Contents className='flex flex-row items-center justify-evenly py-[16px]'>
          <Link
            href={'/trainer/manage/invite'}
            className='flex flex-col items-center justify-center gap-y-[6px]'>
            <IconMail />
            <p className='typography-heading-5'>회원 초대하기</p>
          </Link>
          <Link
            href={'/trainer/manage/append'}
            className='flex flex-col items-center justify-center gap-y-[6px]'>
            <IconPeopleAdd />
            <p className='typography-heading-5'>가입된 회원 추가</p>
          </Link>
        </Layout.Contents>
      </DialogContent>
    </Dialog>
  );
};
