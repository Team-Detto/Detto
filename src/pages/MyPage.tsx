import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useAuth, useProjectList } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/ProjectList';
import LeftTab from 'components/mypage/LeftTab';
import { getUserInfoData } from 'apis/mypageUsers';
import MemberProfile from 'assets/images/project_member.png';
import thumbnail from 'assets/images/project_thumbnail.png';
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
  const { activeProjectTab, handleProjectTabClick } = useProjectList();
  const { uid } = useAuth();

  const { data: userInfoData }: any = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: getUserInfoData,
  });
  console.log(userInfoData);

  // 임시 목데이터
  const projects = [
    {
      id: '1sdq',
      title: '프로젝트 이름입니다.',
      thumbnail: thumbnail,
      skills: ['React', 'Node.js', 'Figma'],
      participants: [
        {
          type: '기획',
          members: [
            {
              uid: '1',
              profile: MemberProfile,
              skill: 'Figma',
            },
          ],
        },
        {
          type: '개발',
          members: [
            {
              uid: '2',
              profile: MemberProfile,
              skill: 'React',
            },
            {
              uid: '3',
              profile: MemberProfile,
              skill: 'Node.js',
            },
          ],
        },
        {
          type: '디자인',
          members: [
            {
              uid: '2',
              profile: MemberProfile,
              skill: 'Figma',
            },
          ],
        },
      ],
    },
    {
      id: '123s2',
      title: '프로젝트 이름입니다.',
      thumbnail: thumbnail,
      skills: ['React', 'Node.js', 'Figma'],
      participants: [
        {
          type: '기획',
          members: [
            {
              uid: '1',
              profile: MemberProfile,
              skill: 'Figma',
            },
          ],
        },
        {
          type: '개발',
          members: [
            {
              uid: '2',
              profile: MemberProfile,
              skill: 'React',
            },
            {
              uid: '3',
              profile: MemberProfile,
              skill: 'Node.js',
            },
          ],
        },
        {
          type: '디자인',
          members: [
            {
              uid: '2',
              profile: MemberProfile,
              skill: 'Figma',
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    if (!uid) {
      return;
    }
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
              <ProjectList projects={projects} />
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
