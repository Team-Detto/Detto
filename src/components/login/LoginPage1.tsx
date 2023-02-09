import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useLoginModal } from 'hooks';
import { useState } from 'react';

const position = ['기획', '디자인', '프론트', '백엔드'];

// 페이지 1 : 포지션 선택
export default function LoginPage1() {
  const { openModal } = useLoginModal();

  // 확인 버튼 클릭 시 페이지 이동
  const handleNextButtonClick = () => {
    openModal('login', 2);
  };

  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);

  const handleSelectedPosition = (pos: string) => {
    if (selectedPosition.includes(pos)) {
      setSelectedPosition(selectedPosition.filter((p) => p !== pos));
    } else {
      setSelectedPosition([...selectedPosition, pos]);
    }
  };

  return (
    <Container>
      <TextContainer>
        <TitleText>어떤 포지션인지 알려주세요</TitleText>
        <SubText onClick={handleNextButtonClick}>(중복 선택 가능해요)</SubText>
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  padding: 7.5rem 2.5rem;
`;

const TextContainer = styled.div`
  margin-bottom: 3rem;
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
