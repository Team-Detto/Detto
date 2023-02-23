import styled from '@emotion/styled';
import LoadingImg from 'assets/images/logo_loading.gif';
import { useIsMobile } from 'hooks';

const LoadingPage = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileContainer>
        <Image src={LoadingImg} />
      </MobileContainer>
    );
  }

  return (
    <Container>
      <Image src={LoadingImg} />
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

const Image = styled.img`
  width: 20.4375rem;
  height: 12.9375rem;
`;
