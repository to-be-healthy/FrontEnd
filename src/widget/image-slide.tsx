import Image from 'next/image';

import { ImageFile } from '@/feature/log';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNav,
} from '@/shared/ui';
import { cn } from '@/shared/utils';

const ImageSlide = ({ images }: { images: ImageFile[] }) => {
  return (
    <Carousel>
      <CarouselContent className='p-0'>
        {images.map((file, index) => (
          <CarouselItem key={index}>
            <Card className='h-full w-full p-0'>
              <CardContent className=''>
                <Image
                  src={file.fileUrl}
                  alt={'React Rendezvous'}
                  width={300}
                  height={300}
                  className={cn('aspect-square rounded-lg object-contain transition-all')}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNav />
    </Carousel>
  );
};

export { ImageSlide };
