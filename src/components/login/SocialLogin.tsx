import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import KEY_IMG from 'assets/images/login_key.png';
import GITHUB_IMG from 'assets/images/login_github.png';
import FACEBOOK_IMG from 'assets/images/login_facebook.png';
import GOOGLE_IMG from 'assets/images/login_google.png';
import useSocialLogin from 'hooks/useSocialLogin';
import Navigator from './Navigator';

// 페이지 0 : 로그인
export default function SocialLogin() {
  const { overlay, handleGithubLogin, handleGoogleLogin, handleFacebookLogin } =
    useSocialLogin();

  return (
    <Container>
      {/* 로그인 팝업창이 열려있을 때 모달창 상호작용을 방지하기 위한 오버레이 */}
      <Overlay overlay={overlay} />
      <Navigator page={0} close />
      <KeyImg src={KEY_IMG} alt="login" />
      <Title>로그인을 해주세요</Title>
      <LoginButtons>
        <LoginButton onClick={handleGithubLogin}>
          <LogoImg src={GITHUB_IMG} alt="github" />
        </LoginButton>
        <LoginButton onClick={handleFacebookLogin}>
          <LogoImg src={FACEBOOK_IMG} alt="facebook" />
        </LoginButton>
        <LoginButton onClick={handleGoogleLogin}>
          <LogoImg src={GOOGLE_IMG} alt="google" />
        </LoginButton>
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

const Overlay = styled.div<{ overlay: boolean }>`
  display: ${(props) => (props.overlay ? 'block' : 'none')};

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1000;
  opacity: 0.5;
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
