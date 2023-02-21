import {} from 'react';
import { positionList } from 'utils/positions';
import { Position } from 'types/position/positionType';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  positions: Position.Developers;
}

const WritePageMobilePosition = ({ positions }: Props) => {
  const { planner, designer, frontend, backend } = positions;
  return (
    <WritePageMobilePositionContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>필요 포지션</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        {positionList.map((position) => (
          <WritePageMobileBodyPositionBox key={position.type}>
            <WritePageMobileBodyTextInput />
            <WritePageMobileBodyInput
              id="positions"
              type="number"
              placeholder="0"
            />
            <WritePageMobileBodyInputLabel htmlFor="positions">
              명
            </WritePageMobileBodyInputLabel>
          </WritePageMobileBodyPositionBox>
        ))}
      </WritePageMobileBodyRightBox>
    </WritePageMobilePositionContainer>
  );
};

const WritePageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageMobileBodyTextInput = styled.div`
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
const WritePageMobileBodyRightBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
const WritePageMobileBodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const WritePageMobileBodyInput = styled.input`
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
const WritePageMobileBodyInputLabel = styled.label`
  width: 0.6875rem;
  height: 1.75rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
export default WritePageMobilePosition;
