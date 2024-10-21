"use client";

import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Slider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '"> </span>';
    },
  };

  return (
    <Swiper
      pagination={pagination}
      modules={[Pagination,Autoplay]}
      autoplay={{
        delay: 3000000,
        disableOnInteraction: false,
      }}
      className="h-full bg-background"
    >
      <SwiperSlide>
        <Image
          className="w-full h-full object-cover"
          width={"3000"}
          height={"1000"}
          src={"/images/iphone.jpg"}
          alt={""}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full h-full object-cover"
          width={"3000"}
          height={"1000"}
          src={"/images/iphonepro.jpg"}
          alt={""}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className="w-full h-full object-cover"
          width={"3000"}
          height={"1000"}
          src={"/images/watch.jpg"}
          alt={""}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
