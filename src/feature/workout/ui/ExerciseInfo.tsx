'use client';

import { Typography } from '@/shared/mixin';
import { cn } from '@/shared/utils';

import { type Exercise } from '../model/types';

/**
 *
 * @description 운동 기록 목록 페이지 - 운동 정보 미리보기 ("~ 외 N개")
 */
const ExercisePreview = ({ exercises }: { exercises: Exercise[] }) => {
  const excercisesCount = exercises.length;

  const firstExercise = exercises[0];

  if (firstExercise && excercisesCount === 1) {
    return (
      <div className='mt-5 flex w-full justify-between rounded-md bg-gray-100 px-6 py-5'>
        <p className={cn(Typography.TITLE_3, 'text-black')}>{firstExercise.name}</p>
        <p className={cn(Typography.BODY_2, 'text-black')}>
          {`${firstExercise.weight}kg × ${firstExercise.numberOfCycles}회`}
          <span className='ml-2 text-primary-500'>{`${firstExercise.setNum}세트`}</span>
        </p>
      </div>
    );
  }

  if (firstExercise && excercisesCount > 1) {
    return (
      <div className='mt-5 w-full rounded-md bg-gray-100 px-6 py-5'>
        <p className={cn(Typography.TITLE_3, 'text-black')}>
          {`${firstExercise.name} 외 ${excercisesCount - 1}개`}
        </p>
      </div>
    );
  }

  return null;
};

/**
 *
 * @description 운동 기록 상세 페이지 - 운동 상세 정보
 */
const ExerciseDetail = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <div className='mt-5 w-full'>
      <div className='flex flex-col gap-2 rounded-lg bg-gray-100 px-6 py-5'>
        {exercises.map((item) => {
          const { name, weight, setNum, numberOfCycles } = item;
          return (
            <div key={item.exerciseId} className='flex items-center justify-between'>
              <p className={cn(Typography.TITLE_3, 'text-black')}>{name}</p>
              <p className={cn(Typography.BODY_2, 'text-black')}>
                {`${weight}kg × ${numberOfCycles}회`}
                <span className='ml-2 text-primary-500'>{`${setNum}세트`}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ExerciseDetail, ExercisePreview };
