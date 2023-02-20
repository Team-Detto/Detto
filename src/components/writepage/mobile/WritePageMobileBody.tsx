import {} from 'react';
import WritePageMobilePosition from './WritePageMobilePosition';
import WritePageMobileStack from './WritePageMobileStack';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import WritePageMobilePeriod from './WritePageMobilePeriod';
import WritePageMobileDeadline from './WritePageMobileDeadline';
import WritePageMobileThumbnail from './WritePageMobileThumbnail';

const WritePageMobileBody = () => {
  return (
    <WritePageMobileBodyContainer>
      <WritePageMobilePosition />
      <WritePageMobileStack />
      <WritePageMobilePeriod />
      <WritePageMobileDeadline />
      <WritePageMobileThumbnail />
    </WritePageMobileBodyContainer>
  );
};

const WritePageMobileBodyContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const WritePageMobileBodyLeftBox = styled.div`
  width: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const WritePageMobileBodyRightBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
export const WritePageMobileBodyText = styled.p`
  width: 3.625rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray800};
`;
export default WritePageMobileBody;
