import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import LOGO_IMG from 'assets/images/login_logo.webp';
import GITHUB_IMG from 'assets/images/login_github.png';
import FACEBOOK_IMG from 'assets/images/login_facebook.png';
import GOOGLE_IMG from 'assets/images/login_google.png';
import useSocialLogin from 'hooks/useSocialLogin';
import ModalNavigator from '../common/modal/ModalNavigator';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';

// 페이지 0 : 로그인
const SocialLogin = () => {
  const { overlay, handleGithubLogin, handleGoogleLogin, handleFacebookLogin } =
    useSocialLogin();

  return (
    <GlobalModalWrapper width="28.875rem" height="32.5rem">
      <Container>
        <Overlay overlay={overlay} />
        <ModalNavigator page={0} close />
        <LogoImg src={LOGO_IMG} alt="login" />
        <Title>Detto에 오신 걸 환영합니다!</Title>
        <LoginButtons>
          <LoginButton onClick={handleGithubLogin} color="black">
            <SocialImg src={GITHUB_IMG} alt="github" />
            <LogoText>GitHub</LogoText>
          </LoginButton>
          <LoginButton onClick={handleFacebookLogin} color="blue">
            <SocialImg src={FACEBOOK_IMG} alt="facebook" />
            <LogoText>Facebook</LogoText>
          </LoginButton>
          <LoginButton onClick={handleGoogleLogin} color="white">
            <SocialImg src={GOOGLE_IMG} alt="google" />
            <LogoText color="gray">Google</LogoText>
          </LoginButton>
        </LoginButtons>
      </Container>
    </GlobalModalWrapper>
  );
};

export default SocialLogin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const Overlay = styled.div<{ overlay: boolean }>`
  display: ${(props) => (props.overlay ? 'block' : 'none')};

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.3);
`;

const LogoImg = styled.img`
  width: 5.75rem;
  height: 5.75rem;
  margin-top: 0.25rem;
  margin-bottom: 1.25rem;
`;

const Title = styled.h2`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin-bottom: 3.75rem;
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const LoginButton = styled.button<{
  color?: string;
}>`
  display: flex;
  padding: 1rem;

  width: 100%;
  height: 3.5rem;

  background-color: ${(props) =>
    props.color === 'white'
      ? COLORS.white
      : props.color === 'black'
      ? COLORS.black
      : '#1B80E4'};

  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;

  cursor: pointer;
`;

const SocialImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;

  border-radius: 100%;
`;

const LogoText = styled.span<{ color?: string }>`
  color: ${(props) => (props.color === 'gray' ? COLORS.gray800 : COLORS.white)};
  font-weight: 700;
  font-size: 1rem;
  flex: 1;
`;
