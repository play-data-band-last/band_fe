import React from 'react';
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

export default function ClassCarousel(props) {
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
        {props.data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div onClick={() => {goToDetail(item.id)}} className={classes.slideWrap}>
              <div className={classes.topSection}>
                <img src={item.profileImage} />
              </div>
              <div className={classes.bottomSection}>
                <p className={classes.bottomSectionTopText}>{item.category.substring(0, 5)}</p>
                <p className={classes.bottomSectionBotText}>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
