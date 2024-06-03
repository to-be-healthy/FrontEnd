import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  RegisterAndEditDiet,
  useEditDietMutation,
  useStudentDietDetailQuery,
} from '@/entity/diet';
import { DailyDiet, DietContext, DietImageData, useDiet } from '@/feature/diet';
import { IconCheck, IconClose } from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  useToast,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

interface Props {
  dietId: number;
}

export const StudentDietEditPage = ({ dietId }: Props) => {
  const defaultRequestData: RegisterAndEditDiet = {
    breakfastFile: null,
    breakfastFast: false,
    lunchFile: null,
    lunchFast: false,
    dinnerFile: null,
    dinnerFast: false,
  };

  const { showErrorToast } = useShowErrorToast();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const month = searchParams.get('month');
  const router = useRouter();
  const dietContextValue = useDiet();

  const { data: dietData } = useStudentDietDetailQuery(dietId);
  const { mutate: editMutate, isPending: isEditPending } = useEditDietMutation(dietId);

  const dietDate = dayjs(dietData?.eatDate).format('MM월 DD일 (dd)');

  const updateRequestData = (
    image: DietImageData
  ): Promise<Partial<RegisterAndEditDiet>> => {
    return new Promise((resolve) => {
      const isFile = image.fileUrl ? image.fileUrl : null;
      const isFast = image.fileUrl ? false : image.fast;
      if (image.type === 'breakfast') {
        const newData = { breakfastFile: isFile, breakfastFast: isFast };
        resolve(newData);
        return newData;
      } else if (image.type === 'lunch') {
        const newData = { lunchFile: isFile, lunchFast: isFast };
        resolve(newData);
        return newData;
      } else {
        const newData = { dinnerFile: isFile, dinnerFast: isFast };
        resolve(newData);
        return newData;
      }
    });
  };

  const onClickEditDiet = async () => {
    const updatedDataArray: Partial<RegisterAndEditDiet>[] = await Promise.all(
      dietContextValue.images.map(updateRequestData)
    );

    const newRequestData = updatedDataArray.reduce(
      (acc: RegisterAndEditDiet, cur: Partial<RegisterAndEditDiet>) => {
        return { ...acc, ...cur };
      },
      defaultRequestData
    );

    if (newRequestData) {
      editMutate(newRequestData, {
        onSuccess: ({ message }) => {
          toast({
            className: 'h-12',
            description: (
              <div className='flex items-center justify-center'>
                <IconCheck fill={'var(--primary-500)'} />
                <p className='typography-heading-5 ml-6 text-[#fff]'>{message}</p>
              </div>
            ),
            duration: 2000,
          });
          router.push(`/student/diet/${dietId}/detail/?month=${month}`);
        },
        onError: (error) => {
          showErrorToast(error?.response?.data.message ?? '');
        },
      });
    }
  };

  useEffect(() => {
    if (dietData) {
      dietContextValue.setImages([
        {
          fast: dietData?.breakfast.fast,
          fileOrder: 1,
          fileUrl: dietData?.breakfast.dietFile
            ? dietData?.breakfast.dietFile?.fileUrl
            : null,
          type: dietData?.breakfast.type,
        },
        {
          fast: dietData?.lunch.fast,
          fileOrder: 1,
          fileUrl: dietData?.lunch.dietFile ? dietData?.lunch.dietFile?.fileUrl : null,
          type: dietData?.lunch.type,
        },
        {
          fast: dietData?.dinner.fast,
          fileOrder: 1,
          fileUrl: dietData?.dinner.dietFile ? dietData?.dinner.dietFile?.fileUrl : null,
          type: dietData?.dinner.type,
        },
      ]);
    }
  }, [dietData]);

  return (
    <DietContext.Provider value={dietContextValue}>
      <Layout>
        <Layout.Header>
          <AlertDialog>
            <AlertDialogTrigger>
              <IconClose />
            </AlertDialogTrigger>
            <AlertDialogContent className='gap-y-8 px-7 py-8'>
              <AlertDialogHeader
                className={cn(Typography.HEADING_4_BOLD, 'mb-3 text-left text-black')}>
                식단 수정을 그만둘까요?
                <p className={cn(Typography.BODY_1, 'text-left text-gray-600')}>
                  변경된 내용은 저장되지 않아요.
                </p>
              </AlertDialogHeader>
              <AlertDialogFooter className='grid w-full grid-cols-2 items-center justify-center gap-3'>
                <AlertDialogAction
                  asChild
                  className={cn(
                    Typography.TITLE_1_SEMIBOLD,
                    'mt-0 h-[48px] rounded-md bg-[#E2F1FF]  text-primary-500'
                  )}>
                  <Link href={`/student/diet?month=${month}`}>확인</Link>
                </AlertDialogAction>
                <AlertDialogCancel
                  className={cn(
                    Typography.TITLE_1_SEMIBOLD,
                    'mt-0 h-[48px] rounded-md bg-primary-500 text-gray-600 text-white'
                  )}>
                  취소
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <h2
            className={cn(
              Typography.HEADING_4_SEMIBOLD,
              'absolute left-1/2 translate-x-[-50%] text-black'
            )}>
            식단 수정
          </h2>
        </Layout.Header>
        <Layout.Contents className='px-7 py-6'>
          {dietDate && dietContextValue.images && (
            <Card className='w-full'>
              <CardHeader
                className={(Typography.TITLE_3, 'mb-4 text-left text-gray-600')}>
                {dietDate}
              </CardHeader>
              <CardContent>
                <article className='flex items-center justify-between'>
                  {dietContextValue.images.map((diet) => {
                    return <DailyDiet key={diet.type} diet={diet} />;
                  })}
                </article>
              </CardContent>
            </Card>
          )}
        </Layout.Contents>
        <Layout.BottomArea className='px-7 pb-10 pt-7'>
          <Button
            size='full'
            disabled={isEditPending}
            onClick={onClickEditDiet}
            className={cn(Typography.TITLE_1_BOLD, 'text-white')}>
            수정 완료
          </Button>
        </Layout.BottomArea>
      </Layout>
    </DietContext.Provider>
  );
};
