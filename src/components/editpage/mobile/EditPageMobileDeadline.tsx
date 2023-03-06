import { ChangeEvent } from 'react';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyRightBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  deadline: string | number;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditPageMobileDeadline = ({
  deadline,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <EditPageMobileDeadlineContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>모집 마감일</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
        <EditPageMobileDeadlineInput
          type="date"
          name="deadline"
          value={new Date(+new Date(deadline)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
      </EditPageMobileBodyRightBox>
    </EditPageMobileDeadlineContainer>
  );
};

const EditPageMobileDeadlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const EditPageMobileDeadlineInput = styled.input`
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

export default EditPageMobileDeadline;
