import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useGlobalModal } from 'hooks';
import { useState } from 'react';
import ConfirmButton from './ConfirmButton';
import Navigator from './Navigator';

const position = ['기획', '디자인', '프론트', '백엔드'];
const page = 1;

// 페이지 1 : 포지션 선택
export default function LoginPage1() {
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
      <Navigator page={page} />
      <TextContainer>
        <TitleText>어떤 포지션인지 알려주세요</TitleText>
        <SubText>(중복 선택 가능해요)</SubText>
      </TextContainer>
      <Buttons>
        {position.map((pos) => (
          <Button
            key={pos}
            onClick={() => handleSelectedPosition(pos)}
            selected={selectedPosition.includes(pos)}
          >
            {pos}
          </Button>
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

const TitleText = styled.h2`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.4375rem;
  margin-bottom: 0.25rem;
`;

const SubText = styled.h3`
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

const Button = styled.button<{ selected: boolean }>`
  width: 9.125rem;
  height: 5.1875rem;

  border-radius: 1rem;

  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2rem;

  // 버튼 선택 여부에 따라 색상 변경
  background-color: ${({ selected }) =>
    selected ? COLORS.violetB400 : COLORS.gray100};
  color: ${({ selected }) => (selected ? COLORS.white : COLORS.black)};

  transition: 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
