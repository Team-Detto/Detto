import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo1 from 'assets/images/logo_main1.png';
import Logo2 from 'assets/images/logo_main2.gif';

const MainBanner = () => {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <BannerWrap>
      <BannerSlider {...settings}>
        <BannerContainer>
          <BannerTextBox>
            <BannerTitle>
              동료와 만나는 커뮤니티 <br />
              사이드 프로젝트는 디토
            </BannerTitle>
            <BannerSubTitle>
              마음이 맞는 동료를 구하고 계신다면 <br />
              디토에서 프로젝트 메이트를 만나보세요
            </BannerSubTitle>
          </BannerTextBox>
          <BannerFirstImg src={Logo1} />
        </BannerContainer>
        <BannerContainer>
          <BannerTextBox>
            <BannerTitle>
              동료와 만나는 커뮤니티 <br />
              사이드 프로젝트는 디토
            </BannerTitle>
            <BannerSubTitle>
              마음이 맞는 동료를 구하고 계신다면 <br />
              디토에서 프로젝트 메이트를 만나보세요
            </BannerSubTitle>
          </BannerTextBox>
          <BannerSecondImg src={Logo2} />
        </BannerContainer>
      </BannerSlider>
    </BannerWrap>
  );
};

export default MainBanner;
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
const BannerContainer = styled.div`
  width: 100%;
  height: 704px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const BannerTextBox = styled.div`
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
const BannerTitle = styled.div`
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
const BannerSubTitle = styled.div`
  width: 327px;
  height: 64px;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 350;
  font-size: 20px;
  line-height: 160%;
  color: #333d4b;
`;
const BannerFirstImg = styled.img`
  position: absolute;
  width: 751px;
  height: 802px;
  left: 591px;
  top: 0px;
`;
const BannerSecondImg = styled.img`
  position: absolute;
  width: 846px;
  height: 295px;
  left: 474px;
  top: 243px;
`;
