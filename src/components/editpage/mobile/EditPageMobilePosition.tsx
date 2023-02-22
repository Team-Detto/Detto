import { MouseEvent, useCallback } from 'react';
import { mobilePositionList } from 'utils/positions';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import MobileInput from 'components/writepage/mobile/MobileInput';
import styled from '@emotion/styled';

interface Props {
  positions: any;
  setEditFormValue: (value: any) => void;
  onFormValueChangeEvent: (e: any) => void;
}

const EditPageMobilePosition = ({
  positions,
  setEditFormValue,
  onFormValueChangeEvent,
}: Props) => {
  const handleCalculate = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const { id, name, value } = e.currentTarget;
      const numberValue = Number(value);
      const updatedValue =
        id === 'plus' ? numberValue + 1 : Math.max(0, numberValue - 1);
      setEditFormValue((prev: any) => ({
        ...prev,
        positions: {
          ...prev.positions,
          [name]: updatedValue,
        },
      }));
    },
    [setEditFormValue],
  );
  return (
    <EditPageMobilePositionContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>필요 포지션</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
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
      </EditPageMobileBodyRightBox>
    </EditPageMobilePositionContainer>
  );
};

const EditPageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const EditPageMobileBodyRightBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;
export default EditPageMobilePosition;
