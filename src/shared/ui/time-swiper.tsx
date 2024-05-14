import 'swiper/css';

import React from 'react';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as swiperType, SwiperOptions } from 'swiper/types';

interface Props extends SwiperOptions {
  items: string[] | number[];
  onSlideChange?: (e: swiperType) => void;
  className?: string;
}
export const TimeSwiper = ({ items, onSlideChange, className, ...props }: Props) => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={3}
      modules={[Mousewheel]}
      direction='vertical'
      loop={true}
      loopAdditionalSlides={3}
      speed={100}
      slideToClickedSlide={true}
      mousewheel={{
        sensitivity: 0.5, //마우스 휠
      }}
      centeredSlides={true}
      onSlideChange={onSlideChange}
      className={className}
      {...props}>
      {items.map((item, index) => (
        <SwiperSlide key={`${item}_${index}`}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};
