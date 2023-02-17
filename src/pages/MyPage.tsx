import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useAuth, useProjectList } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/myProjectList/ProjectList';
import LeftTab from 'components/mypage/LeftTab';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';

import ProjectsTab from 'components/mypage/ProjectsTab';

export interface Project {
  id: string;
  title: string;
  thumbnail: string;
  skills: string[];
  participants: Participants[];
}
export interface Participants {
  type: string;
  members: Member[];
}

interface Member {
  uid: string;
  profile: string;
  skill: string;
}

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('개인정보');
  const { uid } = useAuth();
  const { activeProjectTab, handleProjectTabClick } = useProjectList();

  // 유저 정보 받아오는 쿼리
  const { data: userInfoData }: any = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: getUserInfoData,
  });
  console.log(userInfoData);

  // 유저 프로젝트 리스트 받아오는 쿼리
  const { data: userProjectListsData }: any = useQuery({
    queryKey: ['userProjectLists', uid],
    queryFn: getUserProjectList,
  });

  return (
    <MyPageContainer>
      <LeftTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <WebContainer>
        <MypageContentsWrapper>
          {activeTab === '개인정보' && (
            <MyPageInfo user={userInfoData} uid={uid} />
          )}
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

const ProjectListWrapper = styled.div``;
