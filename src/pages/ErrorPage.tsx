import styled from '@emotion/styled';
import ErrorImg from 'assets/images/404ErrorImg.webp';
import ErrorMessage from 'assets/images/404ErrorMessage.webp';
import { useIsMobile } from 'hooks';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Helmet>
        <title>Error - Detto</title>
      </Helmet>

      <Container isMobile={isMobile}>
        <Image src={ErrorImg} alt="404 에러" isMobile={isMobile} />
        <Message
          src={ErrorMessage}
          alt="페이지를 찾을 수 없어요"
          isMobile={isMobile}
        />
      </Container>
    </>
  );
};

export default ErrorPage;

const Container = styled.div<{
  isMobile: boolean;
}>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '75rem')};
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img<{
  isMobile: boolean;
}>`
  width: ${({ isMobile }) => (isMobile ? '15.5rem' : '24.4375rem')};
`;

const Message = styled.img<{
  isMobile: boolean;
}>`
  width: ${({ isMobile }) => (isMobile ? '16.375rem' : '20.125rem')};
`;
