import {} from 'react';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobileDeadline = () => {
  return (
    <WritePageMobileDeadlineContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>모집 마감일</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileDeadlineInput type="date" placeholder="YYYY.MM.DD" />
      </WritePageMobileBodyRightBox>
    </WritePageMobileDeadlineContainer>
  );
};

const WritePageMobileDeadlineContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const WritePageMobileDeadlineInput = styled.input`
  width: 7.0625rem;
  height: 2.75rem;
  padding: 0.625rem 1.25rem;
  background-color: ${COLORS.white};
  border: 0.0625rem solid ${COLORS.gray100};
  border-radius: 0.25rem;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
  color: ${COLORS.gray200};

  ::before {
    content: attr(placeholder);
  }
`;

export default WritePageMobileDeadline;
