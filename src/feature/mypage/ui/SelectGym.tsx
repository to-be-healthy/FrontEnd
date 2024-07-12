'use client';

import Image from 'next/image';

import { Gym, useGymListQuery } from '@/entity/gym';
import { Typography } from '@/shared/mixin';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/utils';

interface Props {
  selectGymId: number | null;
  setSelectGymId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const SelectGym = ({ selectGymId, setSelectGymId }: Props) => {
  const { data: gymList, isPending } = useGymListQuery();

  const handleSelectGymId = (gymId: number) => {
    setSelectGymId(gymId);
  };

  return (
    <>
      {isPending && (
        <div className='flex w-full items-center justify-center py-[200px]'>
          <Image src='/images/loading.gif' width={20} height={20} alt='loading' />
        </div>
      )}

      {!isPending && (
        <ul className='w-full'>
          {gymList?.map((item: Gym) => {
            return (
              <li key={item.gymId} className='mb-3 h-[80px] w-full'>
                <Button
                  className={cn(
                    Typography.HEADING_4,
                    'h-full text-black',
                    selectGymId === item.gymId
                      ? 'border-2 border-solid border-primary-500 bg-white'
                      : 'bg-gray-100'
                  )}
                  size='full'
                  id={item.gymId.toString()}
                  onClick={() => handleSelectGymId(item.gymId)}>
                  {item.name}
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
