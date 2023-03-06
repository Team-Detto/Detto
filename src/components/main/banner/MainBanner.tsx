import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Logo1 from 'assets/images/logo_main1.webp';
import COLORS from 'assets/styles/colors';

const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const MainBanner = () => {
  return (
    <SliderWrapper {...settings}>
      <SlideWrapper>
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
          <BannerFirstImg src={Logo1} alt="배너1" />
        </BannerContainer>
      </SlideWrapper>
      <SlideWrapper>
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
          <BannerSecondImg
            src={require('assets/videos/logo_main2.webm')}
            loop
            autoPlay
            controls={false}
          />
        </BannerContainer>
      </SlideWrapper>
    </SliderWrapper>
  );
};

export default MainBanner;
const SliderWrapper = styled(Slider)`
  background-color: ${COLORS.gray50};
  width: 100%;
  height: 44rem;
  .slick-slide {
    width: 100%;
    height: 44rem;
  }
  .slick-dots {
    position: absolute;
    bottom: 2.125rem;

    li {
      margin: 0;
      width: 0.75rem;
      height: 0.75rem;
      margin: 0 0.75rem;
    }
    button {
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 50%;
      background: ${COLORS.gray300};
      &::before {
        display: none;
      }
    }
    .slick-active {
      button {
        background: ${COLORS.violetB500};
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  }
`;
const SlideWrapper = styled.div`
  width: 100%;
  height: 44rem;
  overflow: hidden;
`;
const BannerContainer = styled.div`
  width: 90rem;
  height: 100%;
  margin: 0 auto;
  position: relative;
`;
const BannerTextBox = styled.div`
  position: absolute;
  width: 22.25rem;
  height: 12.8125rem;
  left: 9.125rem;
  top: 19.0625rem;
`;
const BannerTitle = styled.div`
  width: 22.25rem;
  height: 7.25rem;

  font-weight: 700;
  font-size: 2.25rem;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: ${COLORS.gray850};
  margin-bottom: 1.5625rem;
`;
const BannerSubTitle = styled.div`
  width: 20.4375rem;
  height: 4rem;

  font-weight: 350;
  font-size: 1.25rem;
  line-height: 160%;
  color: ${COLORS.gray850};
`;
const BannerFirstImg = styled.img`
  position: absolute;
  width: 46.9375rem;
  height: 50.125rem;
  left: 36.9375rem;
  top: 0;
`;
const BannerSecondImg = styled.video`
  position: absolute;
  width: 52.875rem;
  height: 18.4375rem;
  left: 29.625rem;
  top: 15.1875rem;
`;
