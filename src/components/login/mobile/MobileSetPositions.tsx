import styled from '@emotion/styled';
import { firestore } from 'apis/firebaseService';
import COLORS from 'assets/styles/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal, useToastPopup } from 'hooks';
import React, { useState } from 'react';
import { career as careerList, positionList } from 'utils/positions';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import MobileConfirmButton from './MobileConfirmButton';

// 페이지 1 : 포지션 선택
const page = 1;

export default function MobileSetPositions() {
  const [positions, setPositions] = useState<string[]>([]);
  const [career, setCareer] = useState<string>('');

  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  const handleCheckPositions = (isChecked: boolean, pos: string) => {
    if (!isChecked) {
      setPositions(positions.filter((p) => p !== pos).sort());
    } else {
      setPositions([...positions, pos].sort().sort());
    }
  };

  // 포지션 선택 유효성 검사
  const checkValidation = () => {
    if (positions.length === 0) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    if (career === '') {
      handleToastPopup('경력을 선택해주세요.');
      return false;
    }
    return true;
  };

  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    if (!checkValidation()) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      positions,
      isJunior: career === 'junior',
    });
    openModal('login', page + 1);
  };

  return (
    <Container>
      {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
      <ModalNavigator page={page} back />
      <BodyContainer>
        <div>
          <TextContainer>
            <TitleText>어떤 포지션인지 알려주세요</TitleText>
            <SubText>(중복 선택 가능해요)</SubText>
          </TextContainer>
          <ButtonsContainer>
            {positionList.map(({ type, name }) => (
              <React.Fragment key={type}>
                <Input
                  type="checkbox"
                  name="position"
                  id={type}
                  onChange={(e) =>
                    handleCheckPositions(e.currentTarget.checked, type)
                  }
                />
                <Label type="position" htmlFor={type}>
                  {name}
                </Label>
              </React.Fragment>
            ))}
          </ButtonsContainer>
        </div>
        <div>
          <TextContainer>
            <TitleText>경력을 선택해주세요</TitleText>
          </TextContainer>
          <ButtonsContainer>
            {careerList.map(({ id, value }) => (
              <React.Fragment key={id}>
                <Input
                  type="radio"
                  name="career"
                  value={id}
                  id={id}
                  onChange={(e) => setCareer(e.currentTarget.value)}
                />
                <Label type="career" htmlFor={id}>
                  {value}
                </Label>
              </React.Fragment>
            ))}
          </ButtonsContainer>
        </div>
      </BodyContainer>
      <MobileConfirmButton onClick={handleConfirmButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 100%;

  padding: 1rem;
`;

const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;

  margin-bottom: 0.5rem;
`;

const TitleText = styled.h3`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;
`;

const SubText = styled.h2`
  color: ${COLORS.gray750};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.375rem;
  letter-spacing: -0.02rem;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
`;

const Label = styled.label<{ type: 'position' | 'career' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.625rem;
  flex: 1 1 auto;

  font-size: ${({ type }) => (type === 'position' ? '0.6875rem' : '0.875rem')};
  font-weight: 400;

  background-color: ${COLORS.gray50};
  border-radius: 0.75rem;

  cursor: pointer;

  transition: 100ms ease-in-out;
`;

const Input = styled.input`
  display: none;

  color: ${COLORS.gray100};

  &:checked + label {
    color: ${COLORS.white};
    background-color: ${COLORS.violetB500};
    font-weight: 700;
  }
`;
