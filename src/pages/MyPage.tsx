import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useAuth, useIsMobile, useProjectList } from 'hooks';
import { Helmet } from 'react-helmet-async';
import { DocumentData } from 'firebase/firestore';
import LoadingPage from './LoadingPage';
import MobileMyPage from 'components/mypage/mobile/MobileMyPage';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/myProjectList/ProjectList';
import LeftTab from 'components/mypage/LeftTab';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('개인정보');
  const isMobile = useIsMobile();
  const { uid } = useAuth();
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();

  // 유저 정보 받아오는 쿼리
  const { status, data: userInfoData }: DocumentData = useQuery({
    queryKey: ['users', uid],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
  });

  // 유저 프로젝트 리스트 받아오는 쿼리
  const { data: userProjectListsData }: DocumentData = useQuery({
    queryKey: ['myProjects', uid],
    queryFn: getUserProjectList,
    staleTime: staleTime.myProjects,
    enabled: !!uid,
  });

  useEffect(() => {
    setActiveProjectTab('appliedProjects');
  }, []);

  if (status === 'loading') {
    return <LoadingPage />;
  }

  return (
    <>
      <Helmet>
        <title>{`${userInfoData.displayName} - Detto`}</title>
      </Helmet>
      {isMobile ? (
        <MobileMyPage user={userInfoData} pidList={userProjectListsData} />
      ) : (
        <MyPageContainer>
          <LeftTab activeTab={activeTab} setActiveTab={setActiveTab} />
          <WebContainer>
            <MypageContentsWrapper>
              {activeTab === '개인정보' && <MyPageInfo user={userInfoData} />}
              {activeTab === '프로젝트' && (
                <ProjectListWrapper isMobile={isMobile}>
                  <ProjectsTab
                    category={activeProjectTab}
                    onTabClick={handleProjectTabClick}
                  />
                  <ProjectList
                    category={activeProjectTab}
                    pidList={userProjectListsData}
                  />
                </ProjectListWrapper>
              )}
            </MypageContentsWrapper>
          </WebContainer>
        </MyPageContainer>
      )}
    </>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  max-height: 100%;
  background-color: #fcfcfc;
  display: flex;
`;

const MypageContentsWrapper = styled.main``;

export const ProjectListWrapper = styled.div<{ isMobile: boolean }>`
  min-height: ${({ isMobile }) => (isMobile ? '28rem' : '')};
  padding: ${({ isMobile }) => (isMobile ? '' : '10rem 0')};
`;
