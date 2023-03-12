import styled from '@emotion/styled';
import WELCOME_IMG from 'assets/images/login_welcome.webp';
import COLORS from 'assets/styles/colors';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';
import { useGlobalModal } from 'hooks';

// 페이지 4 : 환영합니다!
const Welcome = () => {
  const { closeModal } = useGlobalModal();

  const handleModalClose = () => {
    closeModal();
    window.location.reload();
  };

  return (
    <GlobalModalWrapper width="37.5rem" height="22.625rem">
      <Container>
        <KeyImg src={WELCOME_IMG} alt="login" />
        <TextContainer>
          <TitleText>Detto에 오신 걸 환영합니다!</TitleText>
          <SubText>Detto와 함께 즐거운 프로젝트 여정을 만들어보세요</SubText>
        </TextContainer>
        <ConfirmButton onClick={handleModalClose}>확인</ConfirmButton>
      </Container>
    </GlobalModalWrapper>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const KeyImg = styled.img`
  width: 4.6875rem;
  height: 4.6875rem;
  margin-bottom: 1.25rem;
`;

const TextContainer = styled.div`
  margin-bottom: 3.75rem;
`;

const TitleText = styled.h2`
  color: ${COLORS.gray850};

  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;

  margin-bottom: 0.25rem;
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

  background: ${COLORS.violetB400};
  border-radius: 1rem;
  transition: all 100ms ease-in-out;

  &:hover {
    background: ${COLORS.violetB300};
  }
`;
