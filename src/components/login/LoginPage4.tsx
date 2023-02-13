import styled from '@emotion/styled';
import WELCOME_IMG from 'assets/images/login_welcome.png';
import COLORS from 'assets/styles/colors';
import { useLoginModal } from 'hooks';

// 페이지 4 : 환영합니다!
export default function LoginPage4() {
  const { closeModal } = useLoginModal();

  return (
    <Container>
      <TopContainer>
        <KeyImg src={WELCOME_IMG} alt="login" />
        <TextContainer>
          <TitleText>Detto에 오신 걸 환영합니다!</TitleText>
          <SubText>Detto와 함께 즐거운 프로젝트 여정을 만들어보세요</SubText>
        </TextContainer>
      </TopContainer>
      <ConfirmButton onClick={closeModal}>확인</ConfirmButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 2.1875rem 1.125rem;
`;

const TopContainer = styled.div`
  width: 30rem;

  margin-left: 2.125rem;
`;

const KeyImg = styled.img`
  width: 5.125rem;
  height: 5.125rem;
  margin-bottom: 2.0625rem;
`;

const TextContainer = styled.div``;

const TitleText = styled.h2`
  color: ${COLORS.gray850};

  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;

  margin-bottom: 0.8125rem;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};

  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
`;

const ConfirmButton = styled.button`
  color: ${COLORS.white};

  font-weight: 600;
  font-size: 1.0625rem;
  line-height: 1.25rem;

  padding: 1.3125rem 5.9375rem;

  background: ${COLORS.violetA400};
  border-radius: 1rem;
`;
