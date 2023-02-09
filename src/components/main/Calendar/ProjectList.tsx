import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import styled from '@emotion/styled';

SwiperCore.use([Navigation, Pagination]);

const ProjectList = () => {
  return (
    <>
      <ProjectListSwiperContainer
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        direction="vertical"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
      </ProjectListSwiperContainer>
    </>
  );
};

const ProjectListSwiperContainer = styled(Swiper)`
  .swiper-container {
    width: 18.75rem;
    max-height: 26rem;
    background: red;
  }

  .swiper-wrapper {
    width: 18.75rem;
    height: 26rem;
    background: #f2f4f6;
  }

  .swiper-slide {
    width: 300px;
    height: 85px;
    background: purple;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-prev {
    display: none;
  }
  .swiper-button-next {
    display: none;
  }
  /* .swiper-pagination {
    display: none;
  } */
`;

export default ProjectList;
