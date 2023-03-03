import styled from '@emotion/styled';
import ErrorImg from 'assets/images/404ErrorImg.webp';
import ErrorMessage from 'assets/images/404ErrorMessage.webp';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error - Detto</title>
      </Helmet>
      <Container>
        <Image src={ErrorImg} alt="404 에러" />
        <Message src={ErrorMessage} alt="페이지를 찾을 수 없어요" />
      </Container>
    </>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 35.2931rem;
  height: 18.6563rem;
`;

const Message = styled.img`
  width: 483px;
  height: 100px;
`;
