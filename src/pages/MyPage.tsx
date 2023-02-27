import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useAuth, useIsMobile, useProjectList } from 'hooks';
import MobileMyPage from 'components/mypage/mobile/MobileMyPage';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/myProjectList/ProjectList';
import LeftTab from 'components/mypage/LeftTab';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';
import LoadingPage from './LoadingPage';
import { Helmet } from 'react-helmet-async';
import defaultProfile from 'assets/images/default_profile.jpg';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('개인정보');
  const isMobile = useIsMobile();
  const { uid } = useAuth();
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();

  // 유저 정보 받아오는 쿼리
  const { status, data: userInfoData }: any = useQuery({
    queryKey: ['users', uid],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
  });

  // 유저 프로젝트 리스트 받아오는 쿼리
  const { data: userProjectListsData }: any = useQuery({
    queryKey: ['myProjects', uid],
    queryFn: getUserProjectList,
    staleTime: staleTime.myProjects,
  });

  useEffect(() => {
    setActiveProjectTab('appliedProjects');
  }, []);

  return status === 'loading' ? (
    <LoadingPage />
  ) : (
    <>
      <Helmet>
        <title>{`${userInfoData.displayName} - Detto`}</title>

        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="keywords" content="개발자, 사이드프로젝트" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${userInfoData.displayName} - Detto`}
        />
        <meta property="og:site_name" content="Detto" />
        <meta
          property="og:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta
          property="og:image"
          content={userInfoData.photoURL ?? defaultProfile}
        />
        <meta property="og:url" content="https://detto.vercel.app/" />

        <meta
          name="twitter:title"
          content={`${userInfoData.displayName} - Detto`}
        />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta
          name="twitter:image"
          content={userInfoData.photoURL ?? defaultProfile}
        />

        <link rel="canonical" href="https://detto.vercel.app/" />
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
                <ProjectListWrapper>
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

const MypageContentsWrapper = styled.main`
  padding: 10rem 2.5rem 0 2.375rem;
`;

export const ProjectListWrapper = styled.div``;
