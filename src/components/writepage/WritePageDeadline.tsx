import { ChangeEvent } from 'react';
import {
  WritePageBodyText,
  WritePageBodyDateInput,
} from './ProjectWritePageBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePageDeadline = ({
  writeFormValue,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <WritePageBodyDeadlineBox>
      <WritePageBodyText htmlFor="deadline">모집 마감일</WritePageBodyText>
      <WritePageBodyDateInput
        type="date"
        name="deadline"
        id="deadline"
        value={writeFormValue.deadline}
        onChange={onFormValueChangeEvent}
      />
      <WritePageBodyDeadlineText>
        입력하신 날짜 자정에 자동 마감됩니다.
      </WritePageBodyDeadlineText>
    </WritePageBodyDeadlineBox>
  );
};

const WritePageBodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  padding-right: 25rem;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const WritePageBodyDeadlineText = styled.p`
  padding-left: 1rem;
  width: 20rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray600};
  display: flex;
  align-items: center;
`;

export default WritePageDeadline;
