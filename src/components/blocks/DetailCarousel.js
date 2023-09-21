import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

export default function DetailCarousel(props) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // activeSlide가 변경될 때 스와이퍼 컴포넌트를 제어하여 해당 인덱스로 이동
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(props.activeSlide);
    }

  }, [props.activeSlide]);

  return (
    <>
      <Swiper
        eeffect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        onSlideChange={(swiper) => {
          // 스와이퍼 슬라이드가 변경될 때 부모 컴포넌트의 borderAction 함수 호출
          props.onSlideChange(swiper.activeIndex);
        }}
        initialSlide={props.activeSlide}
        ref={swiperRef}
        style={{height : 'calc(100vh - 19vh)'}}
      >
        {props.section.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div>
              {item.el}
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
}
