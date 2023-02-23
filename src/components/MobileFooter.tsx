import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useLocation } from 'react-router-dom';

const MobileFooter = () => {
  const { pathname } = useLocation();
  const isFindProject = pathname.includes('findproject');

  return (
    // TODO:: 푸터 디자인 후 UI 추가 작업 필요
    <FooterContainer isFindeProject={isFindProject}>
      <CopyRightText>@2023 All Rights Reserved</CopyRightText>
    </FooterContainer>
  );
};

export default MobileFooter;

const FooterContainer = styled.footer<{ isFindeProject: boolean }>`
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.gray50};
  margin-top: 7rem;
  padding: 0 1.5rem;
  position: relative;
  left: 0;
  bottom: 0;
  display: ${({ isFindeProject }) => (isFindeProject ? 'none' : 'block')};
`;

const CopyRightText = styled.p`
  margin: 1.125rem 0 2.5rem;
  line-height: 160%;
  padding-top: 1rem;
  color: ${COLORS.gray700};
  font-size: 0.75rem;
  text-align: right;
`;
