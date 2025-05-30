'use client';

/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import { MealType } from '@/entity/diet';
import {
  IconCameraUpload,
  IconCheck,
  IconDelete,
  IconDeleteCircleX,
  IconPlus,
} from '@/shared/assets';
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

import { useDietContext } from '../hooks/useDiet';
import { DietImageType } from '../model/types';

interface SelectImageProps {
  type: MealType;
  setIsSheetOpen: (value: boolean) => void;
}

const ImageUpload = ({ type, setIsSheetOpen }: SelectImageProps) => {
  const { uploadImageDiet } = useDietContext();
  return (
    <label htmlFor={`new-${type}-album-input`} className='cursor-pointer'>
      <Input
        id={`new-${type}-album-input`}
        type='file'
        className='hidden'
        accept='image/*'
        onChange={(e) => {
          uploadImageDiet(e, type);
          setIsSheetOpen(false);
        }}
      />
      <p className='flex items-center justify-start px-7 py-6'>
        <IconCameraUpload width={24} height={24} />
        <span className={cn(Typography.BODY_1, 'ml-4')}>사진 업로드</span>
      </p>
    </label>
  );
};

interface SetFastingProps {
  type: MealType;
  setIsSheetOpen: (value: boolean) => void;
}

const CancelFasting = ({ type, setIsSheetOpen }: SetFastingProps) => {
  const { onClickCancelFasting } = useDietContext();
  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => {
        onClickCancelFasting(type);
        setIsSheetOpen(false);
      }}>
      <IconDeleteCircleX />
      <span className={cn(Typography.BODY_1, 'ml-4')}>단식 해제</span>
    </Button>
  );
};

const CheckFasting = ({ type, setIsSheetOpen }: SetFastingProps) => {
  const { onClickCheckFasting } = useDietContext();

  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => {
        onClickCheckFasting(type);
        setIsSheetOpen(false);
      }}>
      <IconCheck fill='var(--primary-500)' width={24} height={24} />
      <span className={cn(Typography.BODY_1, 'ml-4')}>단식 체크</span>
    </Button>
  );
};

interface DeleteImageProps {
  type: MealType;
  setIsSheetOpen: (value: boolean) => void;
}

const DeleteImage = ({ type, setIsSheetOpen }: DeleteImageProps) => {
  const { clearImages } = useDietContext();

  return (
    <Button
      variant='ghost'
      className='h-full w-full justify-start px-7 py-6'
      onClick={() => {
        clearImages(type);
        setIsSheetOpen(false);
      }}>
      <IconDelete width={24} height={24} />
      <span className={cn(Typography.BODY_1, 'ml-4')}>사진 삭제</span>
    </Button>
  );
};

interface DailyDietProps {
  diet: DietImageType;
}

const dietText = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

export const DailyDiet = ({ diet }: DailyDietProps) => {
  const [issheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className='flex w-[calc((100%-12px)/3)] flex-col items-center justify-between'>
      <div className='mb-1 w-full'>
        {/* 단식일때 */}
        {diet.fast && (
          <Sheet open={issheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger
              className={cn(
                Typography.TITLE_2,
                'flex h-[88px] w-full flex-col items-center justify-center rounded-md bg-gray-100 p-0 text-center text-gray-400'
              )}>
              <span className='mb-1'>
                <IconCheck fill={'var(--primary-500)'} width={17} height={17} />
              </span>
              단식
            </SheetTrigger>
            <SheetContent headerType='thumb' className='p-0 pb-9 pt-4'>
              <SheetHeader
                className={cn(
                  Typography.TITLE_1_SEMIBOLD,
                  'py-5 text-black sm:text-center'
                )}>
                {diet.type && dietText[diet.type]}
              </SheetHeader>

              <ul>
                <li className='h-[56px] border-t border-gray-100'>
                  <ImageUpload type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                </li>
                <li className='h-[56px] border-t border-gray-100'>
                  <CancelFasting type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        )}

        {/* 단식 아닐때 */}
        {!diet.fast && (
          <Sheet open={issheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className='flex h-[88px] w-full cursor-pointer items-center justify-center rounded-md bg-gray-100'>
              {diet?.fileUrl && (
                <img
                  src={diet?.fileUrl}
                  alt={`${diet.type} image`}
                  className='custom-image rounded-md'
                />
              )}
              {!diet?.fileUrl && (
                <IconPlus width={20} height={20} fill={'var(--gray-500)'} />
              )}
            </SheetTrigger>
            <SheetContent headerType='thumb' className='p-0 pb-9 pt-4'>
              <SheetHeader
                className={cn(
                  Typography.TITLE_1_SEMIBOLD,
                  'py-5 text-black sm:text-center'
                )}>
                {diet.type && dietText[diet.type]}
              </SheetHeader>

              <ul>
                <li className='h-[56px] border-t border-gray-100'>
                  <ImageUpload type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                </li>
                {diet.fileUrl ? (
                  <>
                    <li className='h-[56px] border-t border-gray-100'>
                      <CheckFasting type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                    </li>
                    <li className='h-[56px] border-t border-gray-100'>
                      <DeleteImage type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                    </li>
                  </>
                ) : (
                  <li className='h-[56px] border-t border-gray-100'>
                    <CheckFasting type={diet.type} setIsSheetOpen={setIsSheetOpen} />
                  </li>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <span className={cn(Typography.BODY_4_MEDIUM, 'text-gray-500')}>
        {dietText[diet.type]}
      </span>
    </div>
  );
};
