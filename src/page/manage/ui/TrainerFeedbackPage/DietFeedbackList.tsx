/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { MealType, useStudentFeedbackDietListQuery } from '@/entity/diet';
import { IconNotification } from '@/shared/assets';
import { Typography } from '@/shared/mixin';
import { Card, CardContent } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface NoDietProps {
  index: number;
}

const NoFeedbackDiet = ({ index }: NoDietProps) => {
  return (
    <li
      key={`feedback_diet_${index}`}
      className={cn(
        Typography.TITLE_1_BOLD,
        'flex flex-col items-center justify-center py-28 text-gray-700'
      )}>
      <span className='mb-5 w-[35px]'>
        <IconNotification width={33} height={33} stroke='var(--gray-300)' />
      </span>
      피드백을 작성할 식단이 없습니다.
    </li>
  );
};

const ITEMS_PER_PAGE = 10;
const dietDay: MealType[] = ['breakfast', 'lunch', 'dinner'];

const DietFeedbackList = ({ dietDate }: { dietDate: string }) => {
  const month = `${dietDate.split('-')[0]}-${dietDate.split('-')[1]}`;

  const { data, hasNextPage, fetchNextPage } = useStudentFeedbackDietListQuery({
    size: ITEMS_PER_PAGE,
    searchDate: dietDate,
  });

  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch(() => {
        throw new Error('Error fetching next page');
      });
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <div>
      <ul>
        {data?.pages.map((item, index) => {
          if (item.content === null || item.content.length === 0) {
            return <NoFeedbackDiet key={`diet_${index}`} index={index} />;
          }

          return item.content.map((diet) => {
            return (
              <li key={diet.dietId}>
                <Link
                  href={{
                    pathname: `/trainer/manage/${diet.member.id}/diet/${diet.dietId}/detail`,
                    query: { month: month, name: diet.member.name },
                  }}>
                  <Card className='mb-5 w-full px-6 py-7'>
                    <CardContent className='flex items-center justify-between'>
                      <p
                        className={cn(
                          Typography.TITLE_1_BOLD,
                          'relative w-[50px] text-black'
                        )}>
                        {diet.member.name}
                        <span
                          className={
                            diet.feedbackChecked
                              ? ''
                              : 'absolute ml-[2px] h-1 w-1 rounded-[9999px] bg-point'
                          }
                        />
                      </p>
                      <article className='flex w-[calc(100%-70px)] justify-between gap-2'>
                        {dietDay.map((mealType: MealType) => {
                          const meal = diet[mealType];
                          return (
                            <div
                              key={mealType}
                              className='flex flex-1 items-center justify-center'>
                              {meal.fast && (
                                <div
                                  className={cn(
                                    Typography.BODY_4_MEDIUM,
                                    'flex h-[62px] w-full flex-col items-center justify-center rounded-md bg-gray-100 p-0 text-center text-gray-400'
                                  )}>
                                  단식
                                </div>
                              )}
                              {!meal.fast && meal.dietFile?.fileUrl && (
                                <div className='h-[62px] w-full'>
                                  <img
                                    src={meal.dietFile.fileUrl}
                                    alt={`${meal.type} image`}
                                    className='custom-image rounded-md'
                                  />
                                </div>
                              )}
                              {!meal.fast && !meal.dietFile && (
                                <div className='h-[62px] w-full rounded-md bg-gray-100 p-0' />
                              )}
                            </div>
                          );
                        })}
                      </article>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            );
          });
        })}
      </ul>

      {!data?.pages[data?.pages.length - 1].isLast && hasNextPage && (
        <div ref={ref} className='flex items-center justify-center py-3'>
          <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
        </div>
      )}
    </div>
  );
};

export { DietFeedbackList };
