import { ChangeEvent } from 'react';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  startDate: string;
  endDate: string;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePageMobilePeriod = ({
  startDate,
  endDate,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <WritePageMobilePeriodContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>예상 기간</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileDateInput
          id="startDate"
          type="date"
          name="startDate"
          value={startDate}
          onChange={onFormValueChangeEvent}
        />
        −
        <WritePageMobileDateInput
          id="endDate"
          type="date"
          name="endDate"
          value={endDate}
          onChange={onFormValueChangeEvent}
        />
      </WritePageMobileBodyRightBox>
    </WritePageMobilePeriodContainer>
  );
};

const WritePageMobilePeriodContainer = styled.div`
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
  color: ${COLORS.black};

  text-align: center;
  padding-right: 0.5rem;
`;

export default WritePageMobilePeriod;
