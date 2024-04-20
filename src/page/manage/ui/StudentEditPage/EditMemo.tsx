import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import IconBack from '@/shared/assets/images/icon_back.svg';
// import CheckIcon from '@/shared/assets/images/icon_check.svg';
import { Typography } from '@/shared/mixin';
import { Button, Layout } from '@/shared/ui';
import { cn } from '@/shared/utils';

import { StudentEditContext } from '.';

const EditMemo = () => {
  const router = useRouter();
  // const { toast } = useToast();

  const value = useContext(StudentEditContext);
  if (!value) {
    throw new Error();
  }
  const { memberId, name } = value;
  console.log(memberId, name);

  return (
    <Layout>
      <Layout.Header>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => router.replace(`/trainer/manage/${memberId}`)}>
          <IconBack />
        </Button>
        <h2 className={Typography.HEADING_4_SEMIBOLD}>{name}님 메모장</h2>
        <Button variant='ghost' className={cn(Typography.BODY_1, 'p-0')}>
          완료
        </Button>
      </Layout.Header>
      <Layout.Contents>todo</Layout.Contents>
    </Layout>
  );
};

export { EditMemo };
