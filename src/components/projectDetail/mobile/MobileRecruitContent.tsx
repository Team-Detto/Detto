import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const MobileRecruitContent = ({ content }: any) => {
  return (
    <MobileRecruitContentContainer>
      <MobileRecruitContentTitle>모집안내</MobileRecruitContentTitle>
      <MobileRecruitContentText>{content}</MobileRecruitContentText>
    </MobileRecruitContentContainer>
  );
};

export default MobileRecruitContent;

const MobileRecruitContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding: 0 20px;
`;

const MobileRecruitContentTitle = styled.div`
  font-size: 12px;

  color: ${COLORS.gray800};
`;

const MobileRecruitContentText = styled.div`
  width: 100%;
  min-height: 183px;
  height: 100%;
  font-size: 10px;
  line-height: 140%;
  background-color: ${COLORS.white};
  color: ${COLORS.gray800};

  margin-top: 6px;
  padding: 13px 15px;
`;
