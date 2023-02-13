import styled from '@emotion/styled';
import WebContainer from '../components/common/WebContainer';
import { useParams } from 'react-router-dom';
import { findWithCollectionName, viewProject } from 'apis/postDetail';
import TitleThumbnailArea from 'components/projectDetail/TitleThumbnailArea';
import WriterToShareArea from 'components/projectDetail/WriterToShareArea';
import ProjectInfoArea from 'components/projectDetail/ProjectInfoArea';
import MemberInfoArea from 'components/projectDetail/MemberInfoArea';
import ContentArea from 'components/projectDetail/ContentArea';
import ApplyButtonArea from 'components/projectDetail/ApplyButtonArea';
import ApplicantListArea from 'components/projectDetail/ApplicantListArea';
import COLORS from 'assets/styles/colors';
import { useQuery } from '@tanstack/react-query';

const ProjectDetailPage = () => {
  const params = useParams();

  const { data: projectData, isLoading: projectIsLoading } = useQuery({
    queryKey: ['post', params],
    queryFn: () => viewProject(params),
  });

  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ['user', projectData?.uid],
    queryFn: () => findWithCollectionName('user', projectData?.uid), //여기서 TypeError: Cannot read property of undefined 에러남 uid 읽기 전에 요청돼서 그런듯?
  });

  //projectData?.uid로 user테이블 조회해서 닉네임, 프로필 사진 가져오기
  //projectData?.uid 가 현재 uid랑 같은지 판별하고 같으면 수정하기 버튼 display, 지원하기 버튼 -> 마감하기 버튼으로 변경, 지원자 목록 보여주기
  //지원하기 버튼 클릭시 지원자 목록에 uid 추가
  //현재 참여중인 인원, 지원한 인원 uid로 모두 user테이블 조회해서 닉네임, 프로필 사진 가져오기???
  //날짜 데이터 포맷팅
  return (
    <ProjectDetailContainer>
      {(projectIsLoading || userIsLoading) && <div>로딩중</div>}
      {projectData && userData && (
        <WebContainer>
          <ProjectDetailWrapper>
            <TitleThumbnailArea projectData={projectData} params={params.id} />
            <WriterToShareArea
              projectData={projectData}
              pid={params.id}
              userData={userData}
            />
            <RecruitmentInfoContainer>
              <ProjectInfoArea projectData={projectData} />
              <MemberInfoArea />
            </RecruitmentInfoContainer>
            <ContentArea projectData={projectData} />
          </ProjectDetailWrapper>
          <ApplyButtonArea projectData={projectData} userData={userData} />
          {/* currentUser랑 글쓴이uid랑 같으면 보이게하기 */}
          <ApplicantListArea projectData={projectData} userData={userData} />
        </WebContainer>
      )}
    </ProjectDetailContainer>
  );
};

export default ProjectDetailPage;

const ProjectDetailContainer = styled.div`
  background-color: #fcfcfc; //색상표에 없는데 배경으로 사용되고 있음 문의하기
  padding-bottom: 100px;
  height: 100%;
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
  background-color: ${COLORS.white};
  margin-top: 3.5rem;
  align-items: center;
  padding: 2.5rem;
`;
