import { ChangeEvent } from 'react';
import {
  WritePageBodyText,
  WritePageBodyDateInput,
} from './ProjectWritePageBody';
import styled from '@emotion/styled';

interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePagePeriod = ({ writeFormValue, onFormValueChangeEvent }: Props) => {
  return (
    <WritePageBodyEstimatedPeriodBox>
      <WritePageBodyText htmlFor="startDate">예상 기간</WritePageBodyText>
      <WritePageBodyDateInput
        type="date"
        name="startDate"
        id="startDate"
        title="시작일"
        value={writeFormValue.startDate}
        onChange={onFormValueChangeEvent}
      />
      <WritePageBodyDateInput
        type="date"
        name="endDate"
        title="종료일"
        value={writeFormValue.endDate}
        onChange={onFormValueChangeEvent}
      />
    </WritePageBodyEstimatedPeriodBox>
  );
};

const WritePageBodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;

export default WritePagePeriod;
