import styled from '@emotion/styled';
import WELCOME_IMG from 'assets/images/login_welcome.webp';
import COLORS from 'assets/styles/colors';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';
import { useGlobalModal } from 'hooks';
import MobileConfirmButton from './MobileConfirmButton';

// 페이지 4 : 환영합니다!
export default function MobileWelcome() {
  const { closeModal } = useGlobalModal();

  const handleModalClose = () => {
    closeModal();
    window.location.reload();
  };

  return (
    <GlobalModalWrapper width="20rem" height="21.5rem" isMobile>
      <Container>
        <TopContainer>
          <KeyImg src={WELCOME_IMG} alt="login" />
          <TextContainer>
            <TitleText>Detto에 오신 걸 환영합니다!</TitleText>
            <SubText>Detto와 함께 즐거운 프로젝트 여정을 만들어보세요</SubText>
          </TextContainer>
        </TopContainer>
        <MobileConfirmButton onClick={handleModalClose} />
      </Container>
    </GlobalModalWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;

  padding: 1rem;
`;

const TopContainer = styled.div`
  margin-bottom: 2.375rem;
  padding: 0 9px;
`;

const KeyImg = styled.img`
  width: 5rem;
  height: 5rem;
`;

const TextContainer = styled.div``;

const TitleText = styled.h2`
  color: ${COLORS.gray850};

  width: 8.0625rem;

  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;

  margin-bottom: 0.5rem;
`;

const SubText = styled.h3`
  width: 14rem;

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: ${COLORS.gray750};
`;
