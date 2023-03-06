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
        />
      </MobileContainer>
    );
  }

  return (
    <Container>
      <Video
        src={require('assets/videos/logo_loading.webm')}
        loop
        autoPlay
        controls={false}
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

const Video = styled.video`
  width: 4.9375rem;
  height: 4.8125rem;
`;
