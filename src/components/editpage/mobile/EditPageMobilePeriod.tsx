import { ChangeEvent } from 'react';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyRightBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  startDate: string | number;
  endDate: string | number;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditPageMobilePeriod = ({
  startDate,
  endDate,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <EditPageMobilePeriodContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>예상 기간</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
        <EditPageMobileDateInput
          id="startDate"
          type="date"
          name="startDate"
          value={new Date(+new Date(startDate)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
        −
        <EditPageMobileDateInput
          id="endDate"
          type="date"
          name="endDate"
          value={new Date(+new Date(endDate)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
      </EditPageMobileBodyRightBox>
    </EditPageMobilePeriodContainer>
  );
};

const EditPageMobilePeriodContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const EditPageMobileDateInput = styled.input`
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
export default EditPageMobilePeriod;
