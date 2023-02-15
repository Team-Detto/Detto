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
import { useAuth, useModal } from 'hooks';
import ApplyModal from 'components/projectDetail/modals/ApplyModal';

const ProjectDetailPage = () => {
  const params = useParams();

  //프로젝트 데이터 조회
  const { data: projectData } = useQuery({
    queryKey: ['post', params?.id],
    queryFn: () => viewProject(params?.id),
  });
  const { uid } = useAuth();
  //글쓴이 조회
  const { data: userData } = useQuery({
    queryKey: ['users', projectData?.uid],
    queryFn: () => findWithCollectionName('users', projectData?.uid), //여기서 TypeError: Cannot read property of undefined 에러남 https://github.com/microsoft/vscode/issues/116219
  });

  const { isOpen, handleModalStateChange } = useModal(false);

  //projectData?.uid 가 현재 uid랑 같은지 판별하고 같으면 수정하기 버튼 display, 지원하기 버튼 -> 마감하기 버튼으로 변경, 지원자 목록 보여주기
  //지원하기 버튼 클릭시 지원자 목록에 uid 추가
  //현재 참여중인 인원, 지원한 인원 uid로 모두 user테이블 조회해서 닉네임, 프로필 사진 가져오기???

  return (
    <ProjectDetailContainer>
      {projectData && userData && (
        <WebContainer>
          <ProjectDetailWrapper>
            <TitleThumbnailArea projectData={projectData} pid={params?.id} />
            <WriterToShareArea
              projectData={projectData}
              pid={params?.id}
              userData={userData}
            />
            <RecruitmentInfoContainer>
              <ProjectInfoArea projectData={projectData} />
              <MemberInfoArea applicantsData={projectData?.applicants} />
            </RecruitmentInfoContainer>
            <ContentArea projectData={projectData} />
          </ProjectDetailWrapper>
          <ApplyButtonArea
            projectData={projectData}
            userData={userData}
            onOpenButtonClickEvent={handleModalStateChange}
          />
          <ApplyModal
            isOpen={isOpen}
            message="프로젝트를 지원해볼까요?"
            onClickEvent={handleModalStateChange}
            pid={params.id as string}
          />
          {/* currentUser랑 글쓴이uid랑 같으면 보이게하기 */}
          {projectData?.uid === uid && (
            <ApplicantListArea
              projectData={projectData}
              userData={userData}
              pid={params?.id}
            />
          )}
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
