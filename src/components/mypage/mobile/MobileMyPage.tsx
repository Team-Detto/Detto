import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MobileTopTab from './MobileTopTab';
import MobileUserInfo from './MobileUserInfo';
import { ProjectListWrapper } from 'pages/MyPage';
import MobileProjectListTab from 'components/common/myProjectList/mobile/MobileProjectListTab';
import { useProjectList } from 'hooks';

const MobileMyPage = ({ user }: MypageInfoProps) => {
  const [activeTab, setActiveTab] = useState('개인정보');
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();

  useEffect(() => {
    setActiveProjectTab('appliedProjects');
  }, []);

  return (
    <MobileMyPageContainer>
      <MobileTopTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === '개인정보' && <MobileUserInfo user={user} />}
      {activeTab === '프로젝트' && (
        <ProjectListWrapper>
          <MobileProjectListTab
            category={activeProjectTab}
            onTabClick={handleProjectTabClick}
          />
          {/* TODO:: 활성화된 프로젝트 리스트 추가 필요 */}
        </ProjectListWrapper>
      )}
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
