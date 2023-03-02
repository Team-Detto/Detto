import styled from '@emotion/styled';
import { firestore } from 'apis/firebaseService';
import COLORS from 'assets/styles/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal, useToastPopup } from 'hooks';
import React, { useState } from 'react';
import { career as careerList, mobilePositionList } from 'utils/positions';
import ConfirmButton from './ConfirmButton';
import ModalNavigator from '../common/modal/ModalNavigator';
import ValidationToastPopup from 'components/common/ValidationToastPopup';

// 페이지 1 : 포지션 선택
const page = 1;

export default function SetPositions() {
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
        <TextContainer>
          <TitleText>어떤 포지션인지 알려주세요</TitleText>
          <SubText>(중복 선택 가능해요)</SubText>
        </TextContainer>
        <Buttons>
          {mobilePositionList.map(({ type, name }) => (
            <React.Fragment key={type}>
              <Input
                type="checkbox"
                name="position"
                id={type}
                onChange={(e) =>
                  handleCheckPositions(e.currentTarget.checked, type)
                }
              />
              <Label htmlFor={type}>{name}</Label>
            </React.Fragment>
          ))}
        </Buttons>
        <TextContainer>
          <TitleText>경력을 선택해주세요</TitleText>
        </TextContainer>
        <Buttons>
          {careerList.map(({ id, value }) => (
            <React.Fragment key={id}>
              <Input
                type="radio"
                name="career"
                value={id}
                id={id}
                onChange={(e) => setCareer(e.currentTarget.value)}
              />
              <Label htmlFor={id}>{value}</Label>
            </React.Fragment>
          ))}
        </Buttons>
        <ConfirmButton onClick={handleConfirmButtonClick} />
      </BodyContainer>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 0.25rem;
  margin-bottom: 1.5rem;
`;

const TitleText = styled.h3`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.4375rem;
`;

const SubText = styled.h2`
  color: ${COLORS.gray750};
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.375rem;
  letter-spacing: -0.02rem;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1.25rem;
  width: 100%;
`;

const Label = styled.label`
  height: 3.25rem;
  flex: 1;
  max-width: 10rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.125rem;
  font-weight: 400;

  background-color: ${COLORS.gray50};
  border-radius: 1rem;

  border: 1px solid transparent;

  cursor: pointer;

  transition: 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  margin-bottom: 2.5rem;
`;

const Input = styled.input`
  display: none;

  color: ${COLORS.gray100};

  &:checked + label {
    color: ${COLORS.violetB500};
    background-color: ${COLORS.white};
    border: 1px solid ${COLORS.violetB500};
    font-weight: 700;
  }
`;
