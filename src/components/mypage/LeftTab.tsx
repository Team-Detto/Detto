import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface LeftTabProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const LeftTab = ({ activeTab, setActiveTab }: LeftTabProps) => {
  // 탭 활성화하는 함수
  const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setActiveTab(innerText);
  };

  return (
    <LeftTabWrapper>
      <LeftTabList>
        <LeftTabItem
          isActive={activeTab === '개인정보' ? true : false}
          onClick={handleTabClick}
        >
          개인정보
        </LeftTabItem>
        <LeftTabItem
          isActive={activeTab === '프로젝트' ? true : false}
          onClick={handleTabClick}
        >
          프로젝트
        </LeftTabItem>
      </LeftTabList>
      <WithdrawalBox>탈퇴하기</WithdrawalBox>
    </LeftTabWrapper>
  );
};

export default LeftTab;

const LeftTabWrapper = styled.div`
  min-width: 14.375rem;
  min-height: 100%;
  background-color: ${COLORS.gray50};
  border-right: 1px solid ${COLORS.gray200};
  padding-top: 12.75rem;
`;

const LeftTabList = styled.ul`
  position: fixed;
  left: 0;
`;

const LeftTabItem = styled.li<{ isActive: boolean }>`
  min-width: 14.375rem;
  height: 2.625rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding-right: 1.25rem;
  margin-bottom: 1.25rem;

  background-color: ${({ isActive }) =>
    isActive ? COLORS.violetB400 : 'transparent'};
  border-radius: 0px 4px 4px 0px;

  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray800)};
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  font-size: 1rem;
  cursor: pointer;
`;

const WithdrawalBox = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 14.375rem;
  height: 3rem;
  background-color: ${COLORS.gray100};
  border-right: 1px solid ${COLORS.gray200};

  font-size: 0.875rem;
  color: ${COLORS.red};
  font-weight: 500;
  cursor: pointer;
`;
