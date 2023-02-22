import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { OurTeamText } from './Footer';

const MobileFooter = () => {
  return (
    // TODO:: 푸터 디자인 후 UI 추가 작업 필요
    <FooterContainer>
      <CopyRightText>@2023 All Rights Reserved</CopyRightText>
    </FooterContainer>
  );
};

export default MobileFooter;

const FooterContainer = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.gray50};
  margin-top: 7rem;
  padding: 0 1.5rem;
`;

const CopyRightText = styled(OurTeamText)`
  padding-top: 1rem;
  color: ${COLORS.gray700};
  font-size: 0.75rem;
  text-align: right;
`;
