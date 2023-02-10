import React from 'react';
import SwiperCore, { Navigation, Scrollbar, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import styled from '@emotion/styled';
const MainFindUsers = () => {
  return (
    <MainFindUsersWrap>
      <MainFindUsersContainer>
        <MainFindUsersTitleDiv>
          이런 팀원 분들이 기다리고 있어요!
        </MainFindUsersTitleDiv>
        <MainFindUsersButtonContainer>
          <MainFindUsersButton>기획</MainFindUsersButton>
          <MainFindUsersButton>디자인</MainFindUsersButton>
          <MainFindUsersButton>프론트</MainFindUsersButton>
          <MainFindUsersButton>백엔드</MainFindUsersButton>
        </MainFindUsersButtonContainer>
      </MainFindUsersContainer>
      <MainFindUsersSwiperContainer>
        <MainFindUsersSwiper
          pagination={{
            clickable: true,
          }}
          spaceBetween={50}
          slidesPerView={5}
          navigation
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </MainFindUsersSwiper>
      </MainFindUsersSwiperContainer>
    </MainFindUsersWrap>
  );
};
const MainFindUsersWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 104px;

  width: 1180px;
  height: 442px;
  margin: 0px auto 289px auto;
`;
const MainFindUsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 45px;

  width: 625px;
  height: 137px;
`;
const MainFindUsersTitleDiv = styled.div`
  width: 470px;
  height: 44px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 44px;

  display: flex;
  align-items: center;

  color: #4e5968;
`;
const MainFindUsersButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 19px;

  width: 625px;
  height: 48px;
`;
const MainFindUsersButton = styled.button`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 48px;
  gap: 10px;

  width: 150px;
  height: 48px;

  background: #fafafb;
  border-radius: 36px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  &:hover {
    width: 150px;
    height: 48px;

    /* violet B 400 */

    background: #6f64f2;
    border-radius: 36px;
    color: #ffffff;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
  }
`;
const MainFindUsersSwiperContainer = styled.div`
  padding: 0px;
  gap: 134px;
  /* width: 864px;
  height: 201px; */
  width: 864px;
  height: 201px;
`;
const MainFindUsersSwiper = styled(Swiper)`
  .swiper-wrapper {
    width: 864px;
    height: 201px;
    margin: 0 auto;
    background: purple;
  }

  .swiper-slide {
    text-align: center;
    padding: 0px;
    gap: 16px;
    width: 128px;
    height: 201px;
  }
  .swiper-button-prev {
    left: -50px;
    background: red;
    position: absolute;
    z-index: 1000;
  }
  .swiper-button-next {
  }
`;
export default MainFindUsers;
