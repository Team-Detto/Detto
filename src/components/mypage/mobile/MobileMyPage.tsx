import { useEffect, useState } from 'react';
import { useIsMobile, useProjectList } from 'hooks';
import styled from '@emotion/styled';
import MobileTopTab from './MobileTopTab';
import MobileUserInfo from './MobileUserInfo';
import { ProjectListWrapper } from 'pages/MyPage';
import MobileProjectListTab from 'components/common/myProjectList/mobile/MobileProjectListTab';
import MobileProjectList from './MobileProjectList';
import { PidListProps } from 'components/common/myProjectList/ProjectList';

interface MobileMypageInfoProps {
  user: UserInfo;
  pidList: PidListProps;
}

const MobileMyPage = ({ user, pidList }: MobileMypageInfoProps) => {
  const [activeTab, setActiveTab] = useState('개인정보');
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveProjectTab('appliedProjects');
  }, []);

  return (
    <MobileMyPageContainer>
      <MobileTopTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === '개인정보' && <MobileUserInfo user={user} />}
      {activeTab === '프로젝트' && (
        <ProjectListWrapper isMobile={isMobile}>
          <MobileProjectListTab
            category={activeProjectTab}
            onTabClick={handleProjectTabClick}
          />
          <MobileProjectList category={activeProjectTab} pidList={pidList} />
        </ProjectListWrapper>
      )}
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
  margin-bottom: 5rem;
`;
