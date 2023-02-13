import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import WebContainer from 'components/common/WebContainer';
import MyPageInfo from 'components/mypage/MyPageInfo';
import ProjectList from 'components/common/ProjectList';
import { getUserInfoData } from 'apis/mypageUsers';
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

const MyPage = () => {
  // TODO :: 로그인 기능 구현 이후 세션스토리지 키값 받아오는 부분 수정 필요. firebase:authUser:파이어베이스 API key:[DEFAULT]
  const uid = sessionStorage.getItem('uid');
  const { data: userInfoData }: any = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: getUserInfoData,
  });

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
        <MyPageInfo user={userInfoData} />
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
