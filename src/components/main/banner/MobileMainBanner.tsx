import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Logo2 from 'assets/images/logo_main2.gif';
import COLORS from 'assets/styles/colors';
import mobileFirstBanner from 'assets/images/mobileFirstBanner.png';
const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const MobileMainBanner = (props: any) => {
  return (
    <MobileSliderWrapper {...settings}>
      <MobileSlideWrapper>
        <MobileBannerImg src={mobileFirstBanner} />
      </MobileSlideWrapper>
      <MobileSlideWrapper>
        {/* <MobileBannerContainer>
          <MobileBannerTextBox>
            <MobileBannerTitle>
              동료와 만나는 커뮤니티 <br />
              사이드 프로젝트는 디토
            </MobileBannerTitle>
            <MobileBannerSubTitle>
              마음이 맞는 동료를 구하고 계신다면 <br />
              디토에서 프로젝트 메이트를 만나보세요
            </MobileBannerSubTitle>
          </MobileBannerTextBox>
          <MobileBannerSecondImg src={Logo2} />
        </MobileBannerContainer> */}
        <MobileBannerImg />
      </MobileSlideWrapper>
    </MobileSliderWrapper>
  );
};

export default MobileMainBanner;
const MobileSliderWrapper = styled(Slider)`
  background-color: ${COLORS.gray50};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 15.3125rem;
  .slick-slide {
    width: 100%;
    height: 15.3125rem;
  }
  .slick-dots {
    position: absolute;
    bottom: 0.5rem;

    li {
      margin: 0;
      width: 0.4375rem;
      height: 0.4375rem;
      margin: 0 0.8125rem;
    }
    button {
      width: 0.4375rem;
      height: 0.4375rem;
      border-radius: 50%;
      background: ${COLORS.gray300};
      &::before {
        display: none;
      }
    }
    .slick-active {
      button {
        background: ${COLORS.violetB500};
        width: 0.4375rem;
        height: 0.4375rem;
      }
    }
  }
`;
const MobileSlideWrapper = styled.div`
  width: 100%;
  height: 15.3125rem;
  overflow: hidden;
`;
const MobileBannerImg = styled.img`
  width: 100%;
  object-fit: cover;
  margin-top: 20px;
`;

// const MobileBannerContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   margin: 0 auto;
//   position: relative;
// `;
// const MobileBannerTextBox = styled.div`
//   position: absolute;
//   width: 31.25rem;
//   height: 15.3125rem;
//   left: 2.5rem;
//   top: 4.4375rem;
//   @media screen and (max-width: 370px) {
//     width: 8.1875rem;
//     height: 4.5625rem;
//     left: 2rem;
//     top: 4.4375rem;
//   }
// `;
// const MobileBannerTitle = styled.div`
//   width: 8.4375rem;
//   height: 2.375rem;

//   font-weight: 700;
//   font-size: 0.8rem;
//   line-height: 160%;
//   display: flex;
//   align-items: center;
//   color: ${COLORS.gray850};
//   margin-bottom: 0.5625rem;
//   @media screen and (max-width: 370px) {
//     width: 119px;
//     height: 38px;

//     font-family: 'Noto Sans KR';
//     font-style: normal;
//     font-weight: 700;
//     font-size: 0.75rem;
//     line-height: 160%;

//     display: flex;
//     align-items: center;

//     color: #333d4b;
//   }
// `;
// const MobileBannerSubTitle = styled.div`
//   width: 10.5875rem;
//   height: 1.625rem;

//   font-weight: 350;
//   font-size: 0.5rem;
//   zoom: 0.8;
//   line-height: 160%;
//   color: ${COLORS.gray850};
//   @media screen and (max-width: 370px) {
//     width: 10.25rem;
//     height: 1.625rem;

//     font-family: 'Noto Sans KR';
//     font-style: normal;
//     font-weight: 350;
//     font-size: 2px;
//     line-height: 160%;

//     display: flex;
//     align-items: center;

//     color: #333d4b;
//   }
// `;
// const MobileBannerFirstImg = styled.img`
//   position: absolute;
//   width: 16.5625rem;
//   height: 15.625rem;
//   left: 12.5625rem;
//   top: -8px;

//   @media screen and (max-width: 340px) {
//     width: 9.9375rem;
//     height: 11rem;
//     left: 10.5625rem;
//     top: 1.475rem;
//   }
// `;
// const MobileBannerSecondImg = styled.img`
//   position: absolute;
//   width: 20.5625rem;
//   left: 10.125rem;
//   top: 3.125rem;

//   @media screen and (max-width: 340px) {
//     width: 11.75rem;
//     left: 9.0625rem;
//     top: 4rem;
//   }
// `;
