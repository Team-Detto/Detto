import { ChangeEvent, MouseEvent, useCallback } from 'react';
import { mobilePositionList } from 'utils/positions';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import MobileInput from './MobileInput';
import styled from '@emotion/styled';

interface Props {
  positions: any;
  setWriteFormValue: (value: any) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePageMobilePosition = ({
  positions,
  setWriteFormValue,
  onFormValueChangeEvent,
}: Props) => {
  const handleCalculate = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { id, name, value } = e.currentTarget;
      const numberValue = Number(value);
      const updatedValue =
        id === 'plus' ? numberValue + 1 : Math.max(0, numberValue - 1);
      setWriteFormValue((prev: any) => ({
        ...prev,
        positions: {
          ...prev.positions,
          [name]: updatedValue,
        },
      }));
    },
    [setWriteFormValue],
  );

  return (
    <WritePageMobilePositionContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>필요 포지션</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        {mobilePositionList.map((position) => (
          <MobileInput
            key={position.type}
            name={position.type}
            position={position.name}
            value={positions[position.type]}
            onChangeEvent={onFormValueChangeEvent}
            onClickEvent={handleCalculate}
          />
        ))}
      </WritePageMobileBodyRightBox>
    </WritePageMobilePositionContainer>
  );
};

const WritePageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const WritePageMobileBodyRightBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
export default WritePageMobilePosition;
