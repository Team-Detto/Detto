import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useState } from 'react';
import ConfirmButton from './ConfirmButton';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import SetSkillsPageStack from './SetSkillsPageStack';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import useSetSkills from 'hooks/useSetSkills';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';

// 페이지 2 : 기술스택 선택
const page = 2;

const SetSkills = () => {
  const [skills, setSkills] = useState({
    plannerStack: [],
    designerStack: [],
    developerStack: [],
  });

  const { showToast, ToastMessage, handleConfirmButtonClick } =
    useSetSkills(skills);

  return (
    <GlobalModalWrapper width="68.0625rem" height="44.75rem">
      <Container>
        {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
        <ModalNavigator page={page} back />
        <BodyContainer>
          <TextContainer>
            <TitleText>
              어떤 기술 스택을 하실 수 있으신지 선택해주세요
            </TitleText>
            <SubText>(중복 선택 가능해요)</SubText>
          </TextContainer>
          <SetSkillsPageStack skills={skills} setSkills={setSkills} />
        </BodyContainer>
        <ConfirmButton onClick={handleConfirmButtonClick} />
      </Container>
    </GlobalModalWrapper>
  );
};

export default SetSkills;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 2.5rem;
  padding: 0 2.1875rem;
`;

const TextContainer = styled.div`
  margin-bottom: 1.75rem;
`;

const TitleText = styled.h2`
  width: 22rem;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 140%;

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
