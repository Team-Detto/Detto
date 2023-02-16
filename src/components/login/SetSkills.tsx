import styled from '@emotion/styled';
import { firestore } from 'apis/firebaseService';
import COLORS from 'assets/styles/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';
import { useState } from 'react';
import ConfirmButton from './ConfirmButton';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import SetSkillsPageStack from './SetSkillsPageStack';

// 페이지 2 : 기술스택 선택
const page = 2;

export default function SetSkills() {
  const [skills, setSkills] = useState({
    plannerStack: [],
    designerStack: [],
    developerStack: [],
  });

  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      ...skills,
    });
    openModal('login', page + 1);
  };

  return (
    <Container>
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
  justify-content: space-between;

  margin-bottom: 5.625rem;
`;

const TextContainer = styled.div`
  margin-top: 1.125rem;
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
