import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useGlobalModal } from 'hooks';
import KEY_IMG from 'assets/images/login_key.png';
import GITHUB_IMG from 'assets/images/login_github.png';
import GOOGLE_IMG from 'assets/images/login_google.png';
import KAKAO_IMG from 'assets/images/login_kakao.png';

// 페이지 0 : 로그인
export default function LoginPage0() {
  const { openModal } = useGlobalModal();

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
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 3.75rem 6.25rem;
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
    img: GITHUB_IMG,
  },
  {
    name: 'kakao',
    img: KAKAO_IMG,
  },
  {
    name: 'google',
    img: GOOGLE_IMG,
  },
];
