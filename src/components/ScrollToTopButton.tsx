import styled from '@emotion/styled';
import ScollToTopImage from 'assets/images/scroll_to_top.png';
import { useIsMobile } from 'hooks';
import { useEffect, useState } from 'react';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';

const ScrollToTopButton = () => {
  const isMobile = useIsMobile();
  const [showButton, setShowButton] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleShowButton = () => {
    const { scrollY } = window;
    scrollY > 200 ? setShowButton(true) : setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleShowButton);
    return () => {
      window.removeEventListener('scroll', toggleShowButton);
    };
  }, []);

  if (isMobile) {
    return (
      <>
        {showButton && (
          <MobileButton
            onClick={() => {
              scrollToTop();
              amplitudeToNoneButtonClick('scroll_to_top_button');
            }}
          >
            <img src={ScollToTopImage} alt="Scroll to top" />
          </MobileButton>
        )}
      </>
    );
  }

  return (
    <>
      {showButton && (
        <Button onClick={scrollToTop}>
          <img src={ScollToTopImage} alt="Scroll to top" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;

const MobileButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
  width: 3.3rem;
  height: 3.3rem;
  border-radius: 100%;
`;

const Button = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
`;
