import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useLoginModal } from 'hooks';

const KEY_IMG =
  'https://user-images.githubusercontent.com/88768022/217797462-f5473b81-518e-4a2f-8b42-d6508a35a41c.png';

export default function LoginPage0() {
  const { openModal } = useLoginModal();

  // 로그인 버튼 클릭 시 페이지 이동
  const handleLoginButtonClick = () => {
    openModal('login', 1);
  };

  return (
    <Container>
      <KeyImg src={KEY_IMG} alt="login" />
      <Title>로그인을 해주세요</Title>
      <LoginButtons>
        {socialLogin.map(({ name, img }, idx) => (
          <LoginButton onClick={handleLoginButtonClick} key={idx}>
            <LogoImg src={img} alt={name} />
          </LoginButton>
        ))}
      </LoginButtons>
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

const KeyImg = styled.img`
  width: 5.125rem;
  height: 5.125rem;
  margin-bottom: 1.5625rem;
`;

const Title = styled.h2`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin-bottom: 1.5625rem;
`;

const LoginButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LoginButton = styled.button`
  cursor: pointer;
  transition: 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const LogoImg = styled.img`
  width: 7.5rem;
  height: 7.5rem;

  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.12);
  border-radius: 0.75rem;
`;

const socialLogin = [
  {
    name: 'github',
    img: 'https://user-images.githubusercontent.com/88768022/217803130-372da8ae-5689-43d8-b741-882a7289ad41.png',
  },
  {
    name: 'kakao',
    img: 'https://user-images.githubusercontent.com/88768022/217803137-f2b54570-50c1-4fb0-ac7a-c105ca2b6598.png',
  },
  {
    name: 'google',
    img: 'https://user-images.githubusercontent.com/88768022/217803146-90d21051-51b2-4a1e-80a1-549b52a4a586.png',
  },
];
