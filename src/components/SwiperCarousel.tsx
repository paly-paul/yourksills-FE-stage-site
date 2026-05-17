"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface SwiperCarouselProps extends SwiperProps {
  items: React.ReactNode[];
}

export default function SwiperCarousel({
  items,
  ...swiperProps
}: SwiperCarouselProps) {
  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        loop
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        {...swiperProps}
        className='w-full'>
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='rounded-xl overflow-hidden mx-2'>{item}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-prev absolute top-1/2 left-2 md:-left-6 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80 active:scale-95 bg-purple/20 backdrop-blur-sm rounded-full p-1 md:p-2 '>
        <Image
          src='/icons/previous.svg'
          alt=''
          width={30}
          height={30}
          className='w-5 h-5 md:w-[30px] md:h-[30px]'
        />
      </div>
      <div className='custom-next absolute top-1/2 right-2 md:-right-6 -translate-y-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-110 hover:opacity-80 active:scale-95 bg-purple/20 backdrop-blur-sm rounded-full p-1 md:p-2 '>
        <Image
          src='/icons/next.svg'
          alt=''
          width={30}
          height={30}
          className='w-5 h-5 md:w-[30px] md:h-[30px]'
        />
      </div>
    </div>
  );
}
