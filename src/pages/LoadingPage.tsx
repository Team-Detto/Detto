import styled from '@emotion/styled';
import { useIsMobile } from 'hooks';

const LoadingPage = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileContainer>
        <Video
          src={require('assets/videos/logo_loading.webm')}
          loop
          autoPlay
          controls={false}
          isMobile={isMobile}
        />
      </MobileContainer>
    );
  }

  return (
    <Container>
      <Video
        src={require('assets/videos/logo_loading2.webm')}
        loop
        autoPlay
        controls={false}
        isMobile={isMobile}
      />
    </Container>
  );
};

export default LoadingPage;

const MobileContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '4.9375rem' : '21.6875rem')};
  height: ${({ isMobile }) => (isMobile ? '4.8125rem' : '12.9375rem')};
`;
