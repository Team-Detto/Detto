import styled from '@emotion/styled';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/ProjectList';

import MemberProfile from 'assets/images/project_member.png';
import thumbnail from 'assets/images/project_thumbnail.png';

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

export interface User {
  displayName: string;
  uid: string;
  email: string;
  isJunior: boolean;
  photoURL: string;
  positions: string[];
  skills: string[];
}

const MyPage = () => {
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

  return (
    <MyPageContainer>
      <WebContainer>
        <MyPageInfo />
        <ProjectList
          sectionTitle="모집중인 프로젝트"
          nickname="detto"
          projects={projects}
        />
        <ProjectList
          sectionTitle="지원한 프로젝트"
          nickname="detto"
          projects={projects}
        />
        <ProjectList
          sectionTitle="관심있는 프로젝트"
          nickname="detto"
          projects={projects}
        />
      </WebContainer>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
`;
