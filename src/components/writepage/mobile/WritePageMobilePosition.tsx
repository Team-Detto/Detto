import {} from 'react';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobilePosition = () => {
  return (
    <WritePageMobilePositionContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>필요 포지션</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileBodySelect>
          <option value="planner">기획자</option>
          <option value="designer">디자이너</option>
          <option value="front-end">프론트엔드</option>
          <option value="back-end">백엔드</option>
        </WritePageMobileBodySelect>
        <WritePageMobileBodyInput
          id="positions"
          type="number"
          placeholder="0"
        />
        <WritePageMobileBodyInputLabel htmlFor="positions">
          명
        </WritePageMobileBodyInputLabel>
        <WritePageMobileBodyAddButton>＋</WritePageMobileBodyAddButton>
      </WritePageMobileBodyRightBox>
    </WritePageMobilePositionContainer>
  );
};

const WritePageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageMobileBodySelect = styled.select`
  width: 7.125rem;
  height: 2.6875rem;
  background: ${COLORS.white};
  border: 0.0625rem solid ${COLORS.gray100};
  border-radius: 0.125rem;
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
const WritePageMobileBodyAddButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-weight: 500;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 3.125rem;
`;
export default WritePageMobilePosition;
