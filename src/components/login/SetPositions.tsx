import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useGlobalModal } from 'hooks';
import React, { useState } from 'react';
import ConfirmButton from './ConfirmButton';
import Navigator from './Navigator';

const position = ['기획', '디자인', '프론트', '백엔드'];

// 페이지 1 : 포지션 선택
const page = 1;

export default function SetPositions() {
  const { openModal } = useGlobalModal();

  const handleNextButtonClick = () => {
    openModal('login', page + 1);
  };

  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);

  const handleSelectedPosition = (pos: string) => {
    if (selectedPosition.includes(pos)) {
      setSelectedPosition(selectedPosition.filter((p) => p !== pos));
    } else {
      setSelectedPosition([...selectedPosition, pos]);
    }
  };

  // TODO: Input checkbox 태그로 변경
  return (
    <Container>
      <Navigator page={page} back />
      <TextContainer>
        <TitleText>
          어떤 포지션인지 알려주세요
          <SubText>(중복 선택 가능해요)</SubText>
        </TitleText>
      </TextContainer>
      <Buttons>
        {position.map((pos) => (
          <React.Fragment key={pos}>
            <MenuToggleInput
              type="checkbox"
              name="position"
              id={pos}
              value={pos}
            />
            <MenuLabel htmlFor={pos}>{pos}</MenuLabel>
          </React.Fragment>
        ))}
      </Buttons>
      <ConfirmButton onClick={handleNextButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  width: 100%;

  padding: 2.5rem;
`;

const TextContainer = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
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
  justify-content: space-between;

  margin-bottom: 3.75rem;
`;

const MenuLabel = styled.label`
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

const MenuToggleInput = styled.input`
  display: none;

  color: ${COLORS.gray100};

  &:checked + label {
    color: ${COLORS.white};
    background-color: ${COLORS.violetB400};
    font-weight: 700;
  }
`;
