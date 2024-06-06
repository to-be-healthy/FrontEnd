'use client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import {
  RegisterAndEditDiet,
  useEditDietMutation,
  useStudentDietDetailQuery,
} from '@/entity/diet';
import {
  DailyDiet,
  defaultRequestData,
  DietContext,
  DietImageData,
  useDiet,
  useDietContext,
} from '@/feature/diet';
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

export const DietEditProvider = ({ dietId }: Props) => {
  const dietContextValue = useDiet();

  return (
    <DietContext.Provider value={dietContextValue}>
      <StudentDietEditPage dietId={dietId} />
    </DietContext.Provider>
  );
};

interface Props {
  dietId: number;
}

export const StudentDietEditPage = ({ dietId }: Props) => {
  const { showErrorToast } = useShowErrorToast();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const month = searchParams.get('month');
  const router = useRouter();
  const { images, initialImages } = useDietContext();

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
      images.map(updateRequestData)
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
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
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
      initialImages({
        breakfast: dietData?.breakfast,
        lunch: dietData?.lunch,
        dinner: dietData?.dinner,
      });
    }
  }, [dietData]);

  return (
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
        {dietDate && images && (
          <Card className='w-full'>
            <CardHeader className={(Typography.TITLE_3, 'mb-4 text-left text-gray-600')}>
              {dietDate}
            </CardHeader>
            <CardContent>
              <article className='flex items-center justify-between'>
                {images.map((diet) => {
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
  );
};
