import React from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const TobTab = () => {
  return (
    <TabContainer>
      <TabButton isActive={true}>개인정보</TabButton>
      <TabButton isActive={false}>프로젝트</TabButton>
    </TabContainer>
  );
};

export default TobTab;

const TabContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${COLORS.gray100};
  padding: 0 1.25rem;
  gap: 1rem;
`;

const TabButton = styled.span<{ isActive: boolean }>`
  display: block;
  height: 100%;
  padding: 0.75rem 0.375rem;

  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.5rem;
  color: ${({ isActive }) => (isActive ? COLORS.violetB500 : COLORS.gray400)};
  border-bottom: ${({ isActive }) =>
    isActive ? `2px solid ${COLORS.violetB500}` : 'none'};
`;
