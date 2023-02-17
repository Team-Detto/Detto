import styled from '@emotion/styled';
import LoadingImg from 'assets/images/logo_error.png';

const ErrorPage = () => {
  return (
    <Container>
      <Image src={LoadingImg} />
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

const Image = styled.img`
  width: 35.2931rem;
  height: 18.6563rem;
`;
