import styled from '@emotion/styled';
import ErrorImg from 'assets/images/404ErrorImg.png';
import ErrorMessage from 'assets/images/404ErrorMessage.png';

const ErrorPage = () => {
  return (
    <Container>
      <Image src={ErrorImg} />
      <Message src={ErrorMessage} />
    </Container>
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
