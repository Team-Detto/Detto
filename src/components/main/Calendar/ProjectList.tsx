import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './projectListSwiper.css';

const ProjectList = () => {
  return (
    <>
      <Swiper
        className="project-list-swiper-wrap "
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        direction="vertical"
      >
        <SwiperSlide className="project-slider-list">Slide 1</SwiperSlide>
        <SwiperSlide className="project-slider-list">Slide 2</SwiperSlide>
        <SwiperSlide className="project-slider-list">Slide 3</SwiperSlide>
        <SwiperSlide className="project-slider-list">Slide 4</SwiperSlide>
        <SwiperSlide className="project-slider-list">Slide 5</SwiperSlide>
        <SwiperSlide className="project-slider-list">Slide 6</SwiperSlide>
      </Swiper>
    </>
  );
};
export default ProjectList;
