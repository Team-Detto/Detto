import styled from '@emotion/styled';
import ScollToTopImage from 'assets/images/scroll_to_top.png';

const ScrollToTopButton = () => {
  return (
    <Button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }}
    >
      <img src={ScollToTopImage} alt="Scroll to top" />
    </Button>
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
