import styled from '@emotion/styled';

const LoadingPage = () => {
  return (
    <Container>
      <LoadingImg src={require('assets/images/logo_loading.png')} />
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

const LoadingImg = styled.img`
  width: 20.4375rem;
  height: 12.9375rem;
`;
