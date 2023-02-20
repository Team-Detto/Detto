import {} from 'react';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobilePeriod = () => {
  return (
    <WritePageMobilePeriodContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>예상 기간</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileDateInput type="date" />
        −
        <WritePageMobileDateInput type="date" />
      </WritePageMobileBodyRightBox>
    </WritePageMobilePeriodContainer>
  );
};

const WritePageMobilePeriodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const WritePageMobileDateInput = styled.input`
  width: 7.0625rem;
  height: 2.75rem;
  background-color: ${COLORS.white};
  border: 0.0625rem solid ${COLORS.gray100};
  border-radius: 0.25rem;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
  color: ${COLORS.gray200};

  text-align: center;
  padding-right: 0.5rem;
`;

export default WritePageMobilePeriod;
