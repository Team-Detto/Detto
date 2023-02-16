import styled from '@emotion/styled';
import { firestore } from 'apis/firebaseService';
import COLORS from 'assets/styles/colors';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';
import React, { useState } from 'react';
import { career as careerList, positionList } from 'utils/positions';
import ConfirmButton from './ConfirmButton';
import ModalNavigator from '../common/modal/ModalNavigator';

// 페이지 1 : 포지션 선택
const page = 1;

export default function SetPositions() {
  const [positions, setPositions] = useState<string[]>([]);
  const [career, setCareer] = useState<string>('');

  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  const handleCheckPositions = (isChecked: boolean, pos: string) => {
    if (!isChecked) {
      setPositions(positions.filter((p) => p !== pos).sort());
    } else {
      setPositions([...positions, pos].sort().sort());
    }
  };

  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      positions,
      isJunior: career === 'junior',
    });
    openModal('login', page + 1);
  };

  return (
    <Container>
      <ModalNavigator page={page} back />
      <TextContainer>
        <TitleText>어떤 포지션인지 알려주세요</TitleText>
        <SubText>(중복 선택 가능해요)</SubText>
      </TextContainer>
      <Buttons>
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
            <Label htmlFor={type}>{name}</Label>
          </React.Fragment>
        ))}
      </Buttons>
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 100%;

  padding: 2.5rem;
`;

const TextContainer = styled.div`
  /* margin-top: 2.5rem; */
  /* margin-bottom: 2.5rem; */
`;

const TitleText = styled.h3`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.4375rem;
  margin-bottom: 0.25rem;
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
  gap: 19px;

  /* margin-bottom: 3.75rem; */
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 9.125rem;
  height: 5.1875rem;

  font-size: 1.125rem;
  font-weight: 400;

  background-color: ${COLORS.gray50};
  border-radius: 1rem;

  cursor: pointer;

  transition: 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  display: none;

  color: ${COLORS.gray100};

  &:checked + label {
    color: ${COLORS.white};
    background-color: ${COLORS.violetB400};
    font-weight: 700;
  }
`;
