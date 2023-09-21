import React, {useEffect} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// import required modules
import {FreeMode, Pagination} from 'swiper/modules';

import classes from "../../styles/blocks/Carousel.module.css";
import piano from "../../asset/images/piano.jpeg";
import {useNavigate} from "react-router-dom";

export default function MyHistoryClassCarousel(props) {
  const nav = useNavigate();



  const goToDetail = (data) => {
    nav(`/classDetail?detail=${data}`);
  }

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={-30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {localStorage.getItem('storedData') != undefined ? JSON.parse(localStorage.getItem('storedData')).map((item, idx) => (
          <SwiperSlide key={idx}>
            <div onClick={() => {goToDetail(item.communityId)}} className={classes.slideWrap}>
              <div className={classes.topSection}>
                <img src={item.communityImgPath} />
              </div>
              <div className={classes.bottomSection}>
                <p className={classes.bottomSectionBotText}>{item.communityName}</p>
              </div>
            </div>
          </SwiperSlide>
        )) : <p>최근 본 모임이 없습니다.</p>}
      </Swiper>
    </>
  );
}
