import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import KEY_IMG from 'assets/images/login_key.png';
import GITHUB_MOBILE_IMG from 'assets/images/login_mobile_github.png';
import FACEBOOK_MOBILE_IMG from 'assets/images/login_mobile_facebook.png';
import GOOGLE_MOBILE_IMG from 'assets/images/login_mobile_google.png';
import useSocialLogin from 'hooks/useSocialLogin';
import ModalNavigator from 'components/common/modal/ModalNavigator';

// 페이지 0 : 로그인
export default function MobileSocialLogin() {
  const { overlay, handleGithubLogin, handleGoogleLogin, handleFacebookLogin } =
    useSocialLogin();

  return (
    <Container>
      <Overlay overlay={overlay} />
      <ModalNavigator page={0} close />
      <BodyContainer>
        <TitleWrapper>
          <KeyImg src={KEY_IMG} alt="login" />
          <Title>로그인을 해주세요</Title>
        </TitleWrapper>
        <LoginButtons>
          <LoginButton onClick={handleGithubLogin} color="black">
            <LogoImg src={GITHUB_MOBILE_IMG} alt="github" />
            <LogoText>Git</LogoText>
          </LoginButton>
          <LoginButton onClick={handleFacebookLogin} color="blue">
            <LogoImg src={FACEBOOK_MOBILE_IMG} alt="facebook" />
            <LogoText>Facebook</LogoText>
          </LoginButton>
          <LoginButton onClick={handleGoogleLogin} color="white">
            <LogoImg src={GOOGLE_MOBILE_IMG} alt="google" />
            <LogoText color="gray">Google</LogoText>
          </LoginButton>
        </LoginButtons>
      </BodyContainer>
    </Container>
  );
}

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  padding: 1rem;
`;

const BodyContainer = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const KeyImg = styled.img`
  width: 1.625rem;
  height: 1.625rem;
  margin-right: 0.375rem;
`;

const Title = styled.h2`
  color: ${COLORS.gray850};
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.625rem;
  margin-bottom: 1rem;
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
`;

const LoginButton = styled.button<{
  color?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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

const LogoImg = styled.img`
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
