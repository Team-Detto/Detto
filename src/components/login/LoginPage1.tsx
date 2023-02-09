import styled from '@emotion/styled';

export default function LoginPage1() {
  return (
    <Container>
      <TitleText>어떤 포지션인지 알려주세요</TitleText>
      <LoginButtons></LoginButtons>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 6.25rem;
  top: 3.75rem;

  width: 28.5625rem;
  height: 21.4375rem;
  margin: auto;
`;

const TitleText = styled.h2`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin-bottom: 1.5625rem;
`;

const LoginButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
