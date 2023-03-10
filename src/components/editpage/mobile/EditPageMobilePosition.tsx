import { ChangeEvent, MouseEvent, useCallback } from 'react';
import { mobilePositionList } from 'utils/positions';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import MobileInput from 'components/writepage/mobile/MobileInput';
import styled from '@emotion/styled';

interface Props {
  positions: Position.Developers | any;
  onCalculateEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditPageMobilePosition = ({
  positions,
  onCalculateEvent,
  onFormValueChangeEvent,
}: Props) => {
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
            onClickEvent={onCalculateEvent}
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
