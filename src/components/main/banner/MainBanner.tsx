import SwiperCore, { Navigation, Scrollbar, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import styled from '@emotion/styled';

const MainBanner = () => {
  SwiperCore.use([Navigation, Scrollbar, Pagination]);

  return (
    <>
      <BannerSwiper
        pagination={{
          clickable: true,
        }}
        spaceBetween={50}
        slidesPerView={1}
        navigation
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </BannerSwiper>
    </>
  );
};

export default MainBanner;
const BannerSwiper = styled(Swiper)`
  .swiper-slide {
    width: 100%;
    height: 570px;
    background: #f2f4f6;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }
`;
// 슬라이더 자동 슬라이드
// 텍스트 넣고 옆에 png파일로
