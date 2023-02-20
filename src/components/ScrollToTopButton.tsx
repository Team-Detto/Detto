import styled from '@emotion/styled';
import ScollToTopImage from 'assets/images/scroll_to_top.png';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
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

const Button = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 100%;
`;
