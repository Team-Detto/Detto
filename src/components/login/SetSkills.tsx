import styled from '@emotion/styled';
import { firestore } from 'apis/firebaseService';
import COLORS from 'assets/styles/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal, useToastPopup } from 'hooks';
import { useState } from 'react';
import ConfirmButton from './ConfirmButton';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import SetSkillsPageStack from './SetSkillsPageStack';
import ValidationToastPopup from 'components/common/ValidationToastPopup';

// 페이지 2 : 기술스택 선택
const page = 2;

export default function SetSkills() {
  const [skills, setSkills] = useState({
    plannerStack: [],
    designerStack: [],
    developerStack: [],
  });

  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  // 기술스택 선택 유효성 검사
  const checkValidation = () => {
    if (
      skills.plannerStack.length === 0 &&
      skills.designerStack.length === 0 &&
      skills.developerStack.length === 0
    ) {
      handleToastPopup('기술스택을 선택해주세요.');
      return false;
    }
    return true;
  };

  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    if (!checkValidation()) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      ...skills,
    });
    openModal('login', page + 1);
  };

  return (
    <Container>
      {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
      <ModalNavigator page={page} back />
      <BodyContainer>
        <TextContainer>
          <TitleText>어떤 기술 스택을 하실 수 있으신지 선택해주세요</TitleText>
          <SubText>(중복 선택 가능해요)</SubText>
        </TextContainer>
        <SetSkillsPageStack skills={skills} setSkills={setSkills} />
      </BodyContainer>
      <ConfirmButton onClick={handleConfirmButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const BodyContainer = styled.div`
  height: 29rem;

  display: flex;
  flex-direction: column;

  margin-bottom: 2.5rem;
  padding: 0 35px;
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
