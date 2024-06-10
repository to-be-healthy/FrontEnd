'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ImageFile } from '@/feature/log';
import { FLEX_CENTER } from '@/shared/mixin';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

interface ImageSlideProps {
  images: ImageFile[];
  enlargeMode?: boolean;
}

const ImageSlide = ({ images, enlargeMode = false }: ImageSlideProps) => {
  const [enlargeState, setEnlargeState] = useState(false);

  const changeEnlargeMode = () => {
    if (!enlargeMode) return;
    setEnlargeState((prev) => !prev);
  };

  return (
    <div
      className={cn(
        enlargeState &&
          'fixed left-1/2 top-0 flex h-full w-[var(--max-width)] max-w-[var(--max-width)] -translate-x-1/2 items-center justify-center bg-black'
      )}
      onClick={changeEnlargeMode}>
      <Carousel className={cn(enlargeState && '')}>
        <CarouselContent className={cn('bg-white p-0')}>
          {images.map((file, index) => (
            <CarouselItem key={index}>
              <Card
                className={cn(
                  'h-full w-full bg-white p-0',
                  enlargeState
                    ? 'flex h-full items-center justify-center rounded-none bg-black'
                    : 'bg-white'
                )}>
                <CardContent className={cn(FLEX_CENTER, 'w-full')}>
                  <Image
                    src={file.fileUrl}
                    alt={'React Rendezvous'}
                    width={300}
                    height={300}
                    className={cn(
                      'h-full w-full rounded-lg bg-white object-contain transition-all',
                      enlargeState
                        ? 'aspect-auto h-full w-full rounded-none'
                        : 'aspect-square'
                    )}
                    priority
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNav className={cn(enlargeState && 'absolute bottom-[56px]')} />
      </Carousel>
    </div>
  );
};

export { ImageSlide };
