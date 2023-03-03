import Slider from 'react-slick';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import COLORS from 'assets/styles/colors';
import mobileFirstBanner from 'assets/images/mobileFirstBanner.webp';
import mobilesecondBanner from 'assets/images/mobilesecondBanner.webp';
const settings = {
  arrows: false,
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const MobileMainBanner = () => {
  return (
    <MobileSliderWrapper {...settings}>
      <MobileSlideWrapper>
        <MobileBannerImg src={mobileFirstBanner} alt="배너1" />
      </MobileSlideWrapper>
      <MobileSlideWrapper>
        <MobileBannerImg src={mobilesecondBanner} alt="배너2" />
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
