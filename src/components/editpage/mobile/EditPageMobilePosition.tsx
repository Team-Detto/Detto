import { positionList } from 'utils/positions';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  positions: string[];
}

const EditPageMobilePosition = ({ positions }: Props) => {
  return (
    <EditPageMobilePositionContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>필요 포지션</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
        {positionList.map((position) => (
          <EditPageMobileBodyPositionBox key={position.type}>
            <EditPageMobileBodyTextInput />
            <EditPageMobileBodyInput type="number" placeholder="0" />
            <EditPageMobileBodyInputLabel>명</EditPageMobileBodyInputLabel>
          </EditPageMobileBodyPositionBox>
        ))}
      </EditPageMobileBodyRightBox>
    </EditPageMobilePositionContainer>
  );
};

const EditPageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const EditPageMobileBodyTextInput = styled.div`
  width: 7.125rem;
  height: 2.6875rem;
  background: ${COLORS.white};
  border: 0.0625rem solid ${COLORS.gray100};
  border-radius: 0.125rem;
  padding-left: 0.5rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray850};
`;
const EditPageMobileBodyRightBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const EditPageMobileBodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const EditPageMobileBodyInput = styled.input`
  width: 5.5625rem;
  height: 2.75rem;
  border: 0.0625rem solid ${COLORS.gray100};
  text-align: end;
  padding-right: 0.5rem;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const EditPageMobileBodyInputLabel = styled.label`
  width: 0.6875rem;
  height: 1.75rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;

export default EditPageMobilePosition;
