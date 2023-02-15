import styled from '@emotion/styled';

const ErrorPage = () => {
  return (
    <Container>
      <ErrorImg src={require('assets/images/logo_error.png')} />
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorImg = styled.img`
  width: 35.2931rem;
  height: 18.6563rem;
`;
