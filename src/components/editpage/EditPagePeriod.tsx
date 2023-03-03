import { ChangeEvent } from 'react';
import { BodyText, BodyDateInput } from './ProjectEditPageBody';
import styled from '@emotion/styled';

interface Props {
  startDate: string | number;
  endDate: string | number;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditPagePeriod = ({
  startDate,
  endDate,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <BodyEstimatedPeriodBox>
      <BodyText>예상 기간</BodyText>
      <BodyDateInput
        type="date"
        name="startDate"
        value={new Date(+new Date(startDate)).toISOString().split('T')[0]}
        onChange={onFormValueChangeEvent}
      />
      <BodyDateInput
        type="date"
        name="endDate"
        value={new Date(+new Date(endDate)).toISOString().split('T')[0]}
        onChange={onFormValueChangeEvent}
      />
    </BodyEstimatedPeriodBox>
  );
};

const BodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;

export default EditPagePeriod;
