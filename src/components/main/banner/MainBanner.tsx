import React from 'react';
import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import detoLogo from 'assets/images/detoLogo.png';
const MainBanner = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <BannerWrap>
      <BannerSlider {...settings}>
        <BannerFirstContainer>
          <BannerFirstTextBox>
            <BannerFirstTitle>
              동료와 만나는 커뮤니티 <br />
              사이드 프로젝트는 디토
            </BannerFirstTitle>
            <BannerFirstSubTitle>
              마음이 맞는 동료를 구하고 계신다면 <br />
              디토에서 프로젝트 메이트를 만나보세요
            </BannerFirstSubTitle>
          </BannerFirstTextBox>
          <BannerImg src={detoLogo} />
        </BannerFirstContainer>
        <BannerSecondContainer>2</BannerSecondContainer>
      </BannerSlider>
    </BannerWrap>
  );
};

export default MainBanner;
const BannerImg = styled.img`
  position: absolute;
  width: 846px;
  height: 295px;
  left: 474px;
  top: 243px;
`;
const BannerWrap = styled.div`
  width: 1440px;
  height: 704px;
  margin: 0 auto;
`;
const BannerSlider = styled(Slider)`
  .slick-dots {
    button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ced3db;
      &::before {
        display: none;
      }
    }
    .slick-active {
      button {
        background: #5d50f0;
      }
    }
  }
`;

const BannerFirstContainer = styled.div`
  width: 100%;
  height: 704px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const BannerFirstTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  width: 356px;
  height: 205px;
  left: 146px;
  top: 305px;
`;
const BannerFirstTitle = styled.div`
  width: 356px;
  height: 116px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #333d4b;
  margin-bottom: 25px;
`;
const BannerFirstSubTitle = styled.div`
  width: 327px;
  height: 64px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 350;
  font-size: 20px;
  line-height: 160%;
  color: #333d4b;
`;
const BannerSecondContainer = styled.div``;
