import { useRouter } from 'next/navigation';

import { useAuthAction, useSignInMutation } from '@/entity/auth';
import { Typography } from '@/shared/mixin';
import { Button, useToast } from '@/shared/ui';
import { cn } from '@/shared/utils';

const EXPERIMENT_TRAINER_USER_ID = 'healthytrainer0';
const EXPERIMENT_TRAINER_PASSWORD = '12345678a';

const EXPERIMENT_STUDENT_USER_ID = 'healthystudent0';
const EXPERIMENT_STUDENT_PASSWORD = '12345678a';

const ComplimentaryButton = ({ memberType }: { memberType: string }) => {
  const router = useRouter();
  const { mutate } = useSignInMutation();
  const { setUserInfo } = useAuthAction();
  const { errorToast } = useToast();

  const onClick = () => {
    const userId =
      memberType === 'trainer' ? EXPERIMENT_TRAINER_USER_ID : EXPERIMENT_STUDENT_USER_ID;
    const password =
      memberType === 'trainer'
        ? EXPERIMENT_TRAINER_PASSWORD
        : EXPERIMENT_STUDENT_PASSWORD;

    mutate(
      {
        userId,
        password,
        memberType: memberType.toUpperCase(),
      },
      {
        onSuccess: ({ data }) => {
          setUserInfo(data);
          try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            window.flutter_inappwebview.callHandler('Channel', data.memberId);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
          router.replace(`/${data.memberType?.toLowerCase()}`);
        },
        onError: (error) => {
          const message = error.response?.data?.message ?? '문제가 발생했습니다.';
          errorToast(message);
        },
      }
    );
  };

  return (
    <Button
      variant='link'
      className={cn(Typography.TITLE_3, 'mt-5 text-gray-500 hover:no-underline')}
      onClick={onClick}>
      체험하기
    </Button>
  );
};

export { ComplimentaryButton };
