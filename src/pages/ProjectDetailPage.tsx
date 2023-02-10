import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import WebContainer from '../components/common/WebContainer';
import { firestore } from 'apis/firebaseService';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import TitleThumbnailArea from 'components/projectDetail/TitleThumbnailArea';
import WriterToShareArea from 'components/projectDetail/WriterToShareArea';
import ProjectInfoArea from 'components/projectDetail/ProjectInfoArea';
import MemberInfoArea from 'components/projectDetail/MemberInfoArea';
import ContentArea from 'components/projectDetail/ContentArea';
import ApplyButtonArea from 'components/projectDetail/ApplyButtonArea';

const ProjectDetailPage = () => {
  const params = useParams<{ id: string }>();
  const [projectData, setProjectData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    viewProject();
    findUser(projectData?.uid);
  }, []);

  const viewProject = async () => {
    const docRef = doc(firestore, 'ProjectPost', params.id as string);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    setProjectData(data);
  };

  const findUser = async (uid: string) => {
    const docRef = doc(firestore, 'user', uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    setUserData(data);
  };

  //projectData?.uid로 user테이블 조회해서 닉네임, 프로필 사진 가져오기
  //projectData?.uid 가 현재 uid랑 같은지 판별하고 같으면 수정하기 버튼 display, 지원하기 버튼 -> 마감하기 버튼으로 변경, 지원자 목록 보여주기
  //지원하기 버튼 클릭시 지원자 목록에 uid 추가
  //현재 참여중인 인원, 지원한 인원 uid로 모두 user테이블 조회해서 닉네임, 프로필 사진 가져오기???
  //날짜 데이터 포맷팅
  return (
    <ProjectDetailContainer>
      <WebContainer>
        <ProjectDetailWrapper>
          <TitleThumbnailArea projectData={projectData} />
          <WriterToShareArea projectData={projectData} userData={userData} />
          <RecruitmentInfoContainer>
            <ProjectInfoArea projectData={projectData} />
            <MemberInfoArea />
          </RecruitmentInfoContainer>
          <ContentArea projectData={projectData} />
        </ProjectDetailWrapper>
        <ApplyButtonArea projectData={projectData} userData={userData} />
      </WebContainer>
    </ProjectDetailContainer>
  );
};

export default ProjectDetailPage;

const ProjectDetailContainer = styled.div`
  background-color: #fcfcfc;
  height: 163.25rem;
`;

const ProjectDetailWrapper = styled.div`
  width: 73.75rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const RecruitmentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 73.75rem;
  height: 43.3125rem;
  background-color: #fff;
  margin-top: 3.5rem;
  align-items: center;
  padding: 2.5rem;
`;
