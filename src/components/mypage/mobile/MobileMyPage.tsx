import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import MobileTopTab from './MobileTopTab';
import MobileUserInfo from './MobileUserInfo';
import { ProjectListWrapper } from 'pages/MyPage';
import MobileProjectListTab from 'components/common/myProjectList/mobile/MobileProjectListTab';
import { useProjectList } from 'hooks';
import MobileProjectList from './MobileProjectList';
import { PidListProps } from 'components/common/myProjectList/ProjectList';

interface MobileMypageInfoProps {
  user: User;
  pidList: PidListProps;
}

const MobileMyPage = ({ user, pidList }: MobileMypageInfoProps) => {
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
          {/* TODO:: 활성화된 프로젝트 리스트 아이템 추가 작업 필요 */}
          <MobileProjectList category={activeProjectTab} pidList={pidList} />
        </ProjectListWrapper>
      )}
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
