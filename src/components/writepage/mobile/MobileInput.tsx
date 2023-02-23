import { ChangeEvent, MouseEvent } from 'react';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  name: string;
  value: number;
  position: string;
  onChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickEvent: (e: MouseEvent<HTMLButtonElement>) => void;
}

const MobileInput = ({
  name,
  value,
  position,
  onChangeEvent,
  onClickEvent,
}: Props) => {
  return (
    <WritePageMobileInputContainer>
      <WritePageMobileBodyInputText>{position}</WritePageMobileBodyInputText>
      <WritePageMobileBodyInputBox>
        <WritePageMobileBodyMinusButton
          id="minus"
          name={name}
          value={value}
          onClick={onClickEvent}
        >
          −
        </WritePageMobileBodyMinusButton>
        <WritePageMobileBodyInput
          type="number"
          name={name}
          placeholder="0"
          value={value || ''}
          onChange={onChangeEvent}
        />
        <WritePageMobileBodyPlusButton
          id="plus"
          name={name}
          value={value}
          onClick={onClickEvent}
        >
          +
        </WritePageMobileBodyPlusButton>
      </WritePageMobileBodyInputBox>
    </WritePageMobileInputContainer>
  );
};

const WritePageMobileInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
`;
const WritePageMobileBodyInputText = styled.label`
  width: 2.1rem;
  height: 1.75rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
const WritePageMobileBodyInputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const WritePageMobileBodyMinusButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${COLORS.gray100};
  border-radius: 0.25rem 0rem 0rem 0.25rem;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.gray400};
`;
const WritePageMobileBodyInput = styled.input`
  width: 3.2rem;
  height: 1.5rem;
  border: 0.0625rem solid ${COLORS.gray100};
  text-align: center;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const WritePageMobileBodyPlusButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${COLORS.gray100};
  border-radius: 0rem 0.25rem 0.25rem 0rem;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.gray400};
`;

export default MobileInput;
