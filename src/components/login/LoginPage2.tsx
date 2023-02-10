import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import WritePageStack from 'components/writepage/WritePageStack';
import { useLoginModal } from 'hooks';

// 페이지 2 : 기술스택 선택
export default function LoginPage2() {
  const { openModal } = useLoginModal();

  // 확인 버튼 클릭 시 페이지 이동
  const handleNextButtonClick = () => {
    openModal('login', 3);
  };

  return (
    <Container>
      <TextContainer>
        <TitleText>어떤 기술 스택을 하실 수 있으신지 선택해주세요</TitleText>
        <SubText>
          (중복 선택 가능해요){' '}
          <span onClick={handleNextButtonClick}>(다음 페이지)</span>
        </SubText>
      </TextContainer>
      <WritePageStack />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 5rem 2.5rem;
`;

const TextContainer = styled.div`
  margin-bottom: 5rem;
`;

const TitleText = styled.h2`
  width: 24.5625rem;
  height: 5.5rem;

  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;

  color: ${COLORS.gray850};

  margin-bottom: 0.25rem;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.375rem;
  letter-spacing: -0.02rem;
`;
