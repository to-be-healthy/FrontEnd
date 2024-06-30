'use client';

/* eslint-disable @next/next/no-img-element */
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

import { DietWithFasting, MealType, useRegisterHomeDietMutation } from '@/entity/diet';
import {
  ImageType,
  useCreateS3PresignedUrlMutation,
  useS3UploadImagesMutation,
} from '@/entity/image';
import {
  IconCameraUpload,
  IconCheck,
  IconDelete,
  IconDeleteCircleX,
  IconPlus,
} from '@/shared/assets';
import { useShowErrorToast } from '@/shared/hooks';
import { Typography } from '@/shared/mixin';
import {
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

interface SelectImageProps {
  type: MealType;
  registerDiet: (fast: boolean, file?: string) => void;
}

const ImageUpload = ({ type, registerDiet }: SelectImageProps) => {
  const { mutate: imageMutate } = useCreateS3PresignedUrlMutation();
  const { mutate: s3UploadMutate } = useS3UploadImagesMutation();
  const { showErrorToast } = useShowErrorToast();

  const s3uploadImage = (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const fileListArray = Array.from(files);
      const fileNamesArray = fileListArray.map((file) => file.name);

      imageMutate(fileNamesArray, {
        onSuccess: ({ data }) => {
          const image: ImageType[] = [
            {
              fileUrl: data[0].fileUrl.split('?')[0],
              fileOrder: data[0].fileOrder,
            },
          ];
          s3UploadMutate(
            { url: data[0].fileUrl, file: files[0] },
            {
              onSuccess: () => {
                registerDiet(false, image[0].fileUrl.split('?')[0]);
              },
            }
          );
        },
        onError: (error) => {
          showErrorToast(error?.response?.data.message ?? '에러가 발생했습니다');
        },
      });
    }
  };

  return (
    <label htmlFor={`today-${type}-album-input`} className='cursor-pointer'>
      <Input
        id={`today-${type}-album-input`}
        type='file'
        className='hidden'
        accept='image/*'
        onChange={s3uploadImage}
      />
      <p className='flex items-center justify-start px-7 py-6'>
        <IconCameraUpload width={24} height={24} />
        <span className={cn(Typography.BODY_1, 'ml-4')}>사진 업로드</span>
      </p>
    </label>
  );
};

interface SetFastingProps {
  registerDiet: (fast: boolean) => void;
}

const CancelFasting = ({ registerDiet }: SetFastingProps) => {
  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => registerDiet(false)}>
      <IconDeleteCircleX />
      <span className={cn(Typography.BODY_1, 'ml-4')}>단식 해제</span>
    </Button>
  );
};

const CheckFasting = ({ registerDiet }: SetFastingProps) => {
  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => registerDiet(true)}>
      <IconCheck fill='var(--primary-500)' width={24} height={24} />
      <span className={cn(Typography.BODY_1, 'ml-4')}>단식 체크</span>
    </Button>
  );
};

interface DeleteImage {
  registerDiet: (fast: boolean) => void;
}
const DeleteImage = ({ registerDiet }: DeleteImage) => {
  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => registerDiet(false)}>
      <IconDelete width={24} height={24} />
      <span className={cn(Typography.BODY_1, 'ml-4')}>사진 삭제</span>
    </Button>
  );
};

interface DietProps {
  diet: DietWithFasting;
  type: MealType;
}

const dietText = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const TodayDiet = ({ diet, type }: DietProps) => {
  const [issheetOpen, setIsSheetOpen] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);

  const queryClient = useQueryClient();
  const { showErrorToast } = useShowErrorToast();

  const { mutate: registerDietMutate, isPending: isRegisterPending } =
    useRegisterHomeDietMutation();

  const isAnyLoading = isRegisterPending || isRefetching;

  const registerDiet = (fast: boolean, file?: string) => {
    const params = {
      type: type.toUpperCase(),
      fast: fast,
      file: file ? file : null,
      eatDate: dayjs(new Date()).format('YYYY-MM-DD'),
    };

    if (issheetOpen) {
      setIsSheetOpen(false);
    }

    registerDietMutate(params, {
      onSuccess: async () => {
        setIsRefetching(true);
        await queryClient
          .refetchQueries({
            queryKey: ['StudentHomeData'],
          })
          .finally(() => setIsRefetching(false));
      },
      onError: (error) => {
        showErrorToast(error?.response?.data.message ?? '에러가 발생했습니다');
      },
    });
  };

  return (
    <div className='flex w-[calc((100%-12px)/3)] items-center justify-center'>
      {/* 단식일때 */}
      {diet.fast && (
        <Sheet open={issheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className='flex h-[88px] w-full items-center justify-center rounded-md bg-gray-100 p-0'>
            {isAnyLoading ? (
              <div className='flex h-[88px] w-full items-center justify-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            ) : (
              <p
                className={cn(
                  Typography.TITLE_2,
                  'flex flex-col items-center text-gray-400'
                )}>
                <span className='mb-1'>
                  <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
                </span>
                단식
              </p>
            )}
          </SheetTrigger>
          <SheetContent headerType='thumb' className='p-0 pb-9 pt-4'>
            <SheetHeader
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'py-5 text-black sm:text-center'
              )}>
              {type && dietText[type]}
            </SheetHeader>

            <ul>
              <li className='h-[56px] border-t border-gray-100'>
                <ImageUpload type={type} registerDiet={registerDiet} />
              </li>
              <li className='h-[56px] border-t border-gray-100'>
                <CancelFasting registerDiet={registerDiet} />
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      )}

      {/* 단식 아닐때 */}
      {!diet.fast && (
        <Sheet open={issheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger className='flex h-[88px] w-full cursor-pointer items-center justify-center rounded-md bg-gray-100 p-0'>
            {isAnyLoading ? (
              <div className='flex h-[88px] w-full items-center justify-center'>
                <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
              </div>
            ) : diet?.dietFile?.fileUrl ? (
              <img
                src={`${diet?.dietFile?.fileUrl}?w=400&h=400&q=90`}
                alt={`${type} image`}
                className='custom-image rounded-md'
              />
            ) : (
              !diet?.dietFile?.fileUrl && (
                <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
              )
            )}
          </SheetTrigger>
          <SheetContent headerType='thumb' className='p-0 pb-9 pt-4'>
            <SheetHeader
              className={cn(
                Typography.TITLE_1_SEMIBOLD,
                'py-5 text-black sm:text-center'
              )}>
              {type && dietText[type]}
            </SheetHeader>

            <ul>
              <li className='h-[56px] border-t border-gray-100'>
                <ImageUpload type={diet.type} registerDiet={registerDiet} />
              </li>
              {diet?.dietFile?.fileUrl ? (
                <>
                  <li className='h-[56px] border-t border-gray-100'>
                    <CheckFasting registerDiet={registerDiet} />
                  </li>
                  <li className='h-[56px] border-t border-gray-100'>
                    <DeleteImage registerDiet={registerDiet} />
                  </li>
                </>
              ) : (
                <li className='h-[56px] border-t border-gray-100'>
                  <CheckFasting registerDiet={registerDiet} />
                </li>
              )}
            </ul>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};
