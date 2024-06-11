import Image from 'next/image';
import { useState } from 'react';

import {
  IconBack,
  IconDotsVertical,
  IconNotification,
  IconSearch,
} from '@/shared/assets';
import IconNoCircleCheck from '@/shared/assets/images/noCircleCheck.svg';
import { useDebounce, useShowErrorToast } from '@/shared/hooks';
import { FLEX_CENTER, Typography } from '@/shared/mixin';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/utils';
import { Layout } from '@/widget';

import { useDeleteExerciseMutation } from '../api/useDeleteExerciseMutation';
import { useWorkoutCategoryListQuery } from '../api/useWorkoutCategoryListQuery';
import { useWorkoutTypeListQuery } from '../api/useWorkoutTypeListQuery';
import { CompletedExerciseType } from '../model/types';
import { CreateNewExerciseBottomSheet } from './CreateNewExerciseBottomSheet';

interface Props {
  completedExerciseIds: number[];
  appendExcercise: (newExcerciseType: CompletedExerciseType[]) => void;
  close: () => void;
}

const AppendNewExerciseType = ({
  completedExerciseIds,
  appendExcercise,
  close,
}: Props) => {
  const { showErrorToast } = useShowErrorToast();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { data: categories } = useWorkoutCategoryListQuery();
  const { data: pagedTypes, refetch } = useWorkoutTypeListQuery({
    searchValue: debouncedSearch,
  });
  const { mutate } = useDeleteExerciseMutation();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<number[]>([]);

  const types = pagedTypes?.pages.flatMap((page) => page.content).filter(Boolean);
  const filteredTypes = types
    ?.filter((item) => {
      if (!selectedCategory) return true;
      return item.category === selectedCategory;
    })
    .filter((item) => !completedExerciseIds.includes(item.exerciseId));

  const deleteCustomExercise = (exerciseId: number) => {
    mutate(exerciseId, {
      onSuccess: async () => {
        await refetch();
      },
      onError: (error) => {
        const message = error?.response?.data.message ?? '문제가 발생했습니다.';
        showErrorToast(message);
      },
    });
  };

  const submit = () => {
    if (!types || buttonDisabled) return;

    const selectedExercises = types.filter((item) =>
      selectedTypes.includes(item.exerciseId)
    );
    appendExcercise(selectedExercises);
    close();
  };

  const isPending = !categories || !filteredTypes;
  const buttonDisabled = selectedTypes.length === 0;

  return (
    <Layout className='bg-white'>
      <Layout.Header>
        <Button variant='ghost' size='auto' onClick={close}>
          <IconBack />
        </Button>
        <h1
          className={cn(
            Typography.HEADING_4_SEMIBOLD,
            'absolute left-1/2 -translate-x-1/2'
          )}>
          운동 추가하기
        </h1>
      </Layout.Header>
      <Layout.Contents className='hide-scrollbar'>
        <div className='flex h-fit w-full px-7 py-6'>
          <div className='flex h-fit w-full justify-between rounded-md bg-gray-200 px-6 py-4'>
            <Button variant='ghost' size='icon' className='h-7 w-7'>
              <IconSearch />
            </Button>
            <input
              type='text'
              className='w-full bg-transparent px-5 outline-none ring-0'
              onChange={(e) => setSearch(e.target.value)}
              placeholder='추가하고 싶은 운동을 검색해보세요'
            />
          </div>
        </div>
        {isPending && (
          <div className={cn(FLEX_CENTER, 'mt-10 w-full')}>
            <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
          </div>
        )}
        {!isPending && (
          <>
            <div className='hide-scrollbar overflow-x-auto'>
              <div className='flex w-full flex-nowrap gap-3 px-7'>
                {categories.map(({ category, name }) => {
                  const selected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      className={cn(
                        Typography.TITLE_3,
                        'whitespace-nowrap rounded-md bg-gray-100 px-8 py-2',
                        selected && 'bg-primary-500 text-white'
                      )}
                      onClick={() => {
                        if (selected) {
                          setSelectedCategory(null);
                        } else {
                          setSelectedCategory(category);
                        }
                      }}>
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className='px-7 py-9'>
              <CreateNewExerciseBottomSheet categories={categories} />
            </div>
            {filteredTypes.length === 0 && (
              <div
                className={cn(
                  Typography.HEADING_4_SEMIBOLD,
                  FLEX_CENTER,
                  'mt-10 flex w-full flex-col gap-5 text-gray-400'
                )}>
                <IconNotification width={33} height={33} stroke='var(--gray-300)' />
                추가 가능한 운동이 없습니다.
              </div>
            )}
            {filteredTypes.length > 0 && (
              <ul className='flex w-full flex-col'>
                {filteredTypes.map((type) => {
                  const selected = selectedTypes.includes(type.exerciseId);
                  return (
                    <li key={type.exerciseId}>
                      <label
                        htmlFor={type.names}
                        className={cn(
                          'flex w-full items-center justify-between px-7 py-6',
                          selected && 'bg-blue-10'
                        )}>
                        <div className='flex items-center gap-6'>
                          <input
                            id={type.names}
                            type='checkbox'
                            className='peer hidden'
                            checked={selected}
                            onChange={() => {
                              if (!selected) {
                                setSelectedTypes((prev) => [...prev, type.exerciseId]);
                              }
                              if (selected) {
                                setSelectedTypes((prev) =>
                                  prev.filter((id) => id !== type.exerciseId)
                                );
                              }
                            }}
                          />
                          <span className='flex h-[20px] w-[20px] items-center justify-center rounded-sm border border-solid border-gray-300 peer-checked:border-none peer-checked:bg-primary-500'>
                            <IconNoCircleCheck width={15} height={12} fill='white' />
                          </span>
                          <div className='flex flex-col'>
                            <p className={cn(Typography.TITLE_2)}>{type.names}</p>
                            <span
                              className={cn(Typography.BODY_4_REGULAR, 'text-gray-600')}>
                              {type.muscles}
                            </span>
                          </div>
                        </div>
                        {type.custom && (
                          <Sheet>
                            <SheetTrigger className={cn(FLEX_CENTER, 'h-6 w-6')}>
                              <IconDotsVertical />
                            </SheetTrigger>
                            <SheetContent
                              headerType='thumb'
                              className='flex flex-col px-0 pt-8'>
                              <SheetHeader>
                                <h3
                                  className={cn(
                                    Typography.TITLE_1_SEMIBOLD,
                                    'text-center'
                                  )}>
                                  {type.names}
                                </h3>
                              </SheetHeader>
                              <SheetClose
                                className={cn(
                                  Typography.BODY_1,
                                  'w-full border-t px-7 py-6 text-left'
                                )}
                                onClick={() => deleteCustomExercise(type.exerciseId)}>
                                목록에서 제거
                              </SheetClose>
                            </SheetContent>
                          </Sheet>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </Layout.Contents>
      <Layout.BottomArea>
        <Button variant='default' size='full' onClick={submit} disabled={buttonDisabled}>
          {buttonDisabled ? '운동 추가하기' : `${selectedTypes.length}개의 운동 추가하기`}
        </Button>
      </Layout.BottomArea>
    </Layout>
  );
};

export { AppendNewExerciseType };
