import { ChangeEvent } from 'react';
import { BodyText, BodyDateInput } from './ProjectEditPageBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  deadline: string | number;
  isRecruiting: boolean;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditPageDeadline = ({
  deadline,
  isRecruiting,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <>
      {isRecruiting && (
        <BodyDeadlineBox>
          <BodyText>모집 마감일</BodyText>
          <BodyDateInput
            type="date"
            name="deadline"
            value={new Date(+new Date(deadline)).toISOString().split('T')[0]}
            onChange={onFormValueChangeEvent}
          />
          <BodyDeadlineText>
            입력하신 날짜 11시 59분에 자동 마감됩니다.
          </BodyDeadlineText>
        </BodyDeadlineBox>
      )}
    </>
  );
};

const BodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  padding-right: 25rem;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const BodyDeadlineText = styled.p`
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

export default EditPageDeadline;
