import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { LeftTabProps } from '../LeftTab';

const MobileTopTab = ({ activeTab, setActiveTab }: LeftTabProps) => {
  // 탭 활성화하는 함수
  const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setActiveTab(innerText);
  };

  return (
    <TabContainer>
      <TabButton
        isActive={activeTab === '개인정보' ? true : false}
        onClick={handleTabClick}
      >
        개인정보
      </TabButton>
      <TabButton
        isActive={activeTab === '프로젝트' ? true : false}
        onClick={handleTabClick}
      >
        프로젝트
      </TabButton>
    </TabContainer>
  );
};

export default MobileTopTab;

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

  cursor: pointer;
`;
