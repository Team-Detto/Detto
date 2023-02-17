import styled from '@emotion/styled';
import LoadingImg from 'assets/images/logo_loading.gif';

const LoadingPage = () => {
  return (
    <Container>
      <Image src={LoadingImg} />
    </Container>
  );
};

export default LoadingPage;

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
