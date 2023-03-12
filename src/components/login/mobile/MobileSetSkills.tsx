import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useState } from 'react';
import MobileConfirmButton from './MobileConfirmButton';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import MobileSetSkillsPageStack from './MobileSetSkillsPageStack';
import useSetSkills from 'hooks/useSetSkills';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';

// 페이지 2 : 기술스택 선택
const page = 2;

export default function SetSkills() {
  const [skills, setSkills] = useState({
    plannerStack: [],
    designerStack: [],
    developerStack: [],
  });

  const { showToast, ToastMessage, handleConfirmButtonClick } =
    useSetSkills(skills);

  return (
    <GlobalModalWrapper width="20rem" height="26.1875rem" isMobile>
      <Container>
        {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
        <ModalNavigator page={page} back />
        <BodyContainer>
          <div>
            <TitleText>
              어떤 기술 스택을 하실 수 있으신지 선택해주세요
            </TitleText>
            <SubText>(중복 선택 가능해요)</SubText>
          </div>
          <MobileSetSkillsPageStack skills={skills} setSkills={setSkills} />
        </BodyContainer>
        <MobileConfirmButton onClick={handleConfirmButtonClick} />
      </Container>
    </GlobalModalWrapper>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 1rem;
`;

const BodyContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleText = styled.h2`
  width: 15.8125rem;

  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;

  color: ${COLORS.gray850};
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -0.02rem;
`;
