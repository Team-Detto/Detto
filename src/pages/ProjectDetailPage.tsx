import styled from '@emotion/styled';
import WebContainer from '../components/common/WebContainer';
import { useParams } from 'react-router-dom';
import {
  deleteApplicant,
  firebaseGetIsApplicantRequest,
  updateRecruiting,
  viewProject,
} from 'apis/postDetail';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import TitleThumbnailArea from 'components/projectDetail/TitleThumbnailArea';
import WriterToShareArea from 'components/projectDetail/WriterToShareArea';
import ProjectInfoArea from 'components/projectDetail/ProjectInfoArea';
import MemberInfoArea from 'components/projectDetail/MemberInfoArea';
import ContentArea from 'components/projectDetail/ContentArea';
import ApplyButtonArea from 'components/projectDetail/ApplyButtonArea';
import ApplicantListArea from 'components/projectDetail/ApplicantListArea';
import COLORS from 'assets/styles/colors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useModal } from 'hooks';
import ApplyModal from 'components/projectDetail/ApplyModal/ApplyModal';
import ConfirmAlert from 'components/common/ConfirmAlert';

const ProjectDetailPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();

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

  // 현재 유저가 프로젝트 지원자 인가 조회
  const { data: isApplicant } = useQuery({
    queryKey: ['post', projectData?.applicants],
    queryFn: () => firebaseGetIsApplicantRequest(params?.id, uid),
  });

  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(params?.id as string, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', params?.id]); //마감하기 버튼 성공시 렌더링
      },
    },
  );

  const { mutate: deleteApplicantMutate } = useMutation(
    () => deleteApplicant(params?.id as string, uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', params?.id]); //마감하기 버튼 성공시 렌더링
      },
    },
  );

  // 마감하기 버튼 이벤트 핸들러
  const handleAuthorButtonClick = () => {
    updateRecruitingMutate(params?.id as any, false as any);
    handleCloseModalCloseChange();
  };

  const {
    isOpen: isApply,
    handleModalOpenChange: handleApplyModalOpenChange,
    handleModalCloseChange: handleApplyModalCloseChange,
  } = useModal(false);

  const {
    isOpen: isClose,
    handleModalOpenChange: handleCloseModalOpenChange,
    handleModalCloseChange: handleCloseModalCloseChange,
  } = useModal(false);

  //projectData?.uid 가 현재 uid랑 같은지 판별하고 같으면 수정하기 버튼 display, 지원하기 버튼 -> 마감하기 버튼으로 변경, 지원자 목록 보여주기
  //지원하기 버튼 클릭시 지원자 목록에 uid 추가
  //현재 참여중인 인원, 지원한 인원 uid로 모두 user테이블 조회해서 닉네임, 프로필 사진 가져오기???

  return (
    <ProjectDetailContainer>
      {projectData && (
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
            pid={params?.id}
            isApplicant={isApplicant}
            projectData={projectData}
            onApplyModalStateChangeEvent={handleApplyModalOpenChange} //지원하기
            onCloseModalStateChangeEvent={handleCloseModalOpenChange} //마감하기
          />
          {/* //지원 안했다면 지원하기 모달 */}
          <ApplyModal
            isOpen={isApply}
            message="프로젝트를 지원해볼까요?"
            onClickEvent={handleApplyModalCloseChange}
            pid={params.id as string}
          />
          {/* //지원 했다면 Alert*/}
          <ConfirmAlert
            isOpen={isClose}
            message={
              isApplicant
                ? '지원을 취소하시겠습니까?'
                : '지원공고를 마감할까요?'
            }
            subMessage={
              isApplicant
                ? '정말 취소 하실건지 확인해주세요!'
                : '팀원이 모두 모집되었는지 한 번 더 확인해주세요!'
            }
            onClickEvent={() => {
              isApplicant
                ? (handleCloseModalCloseChange(), deleteApplicantMutate())
                : handleAuthorButtonClick();
            }}
            onCloseEvent={handleCloseModalCloseChange}
          />
          {/* currentUser랑 글쓴이uid랑 같고 모집중이면 지원자 목록 보이게하기 */}
          {projectData?.uid === uid && projectData?.isRecruiting === true && (
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
  min-height: 100vh;
  max-height: 100%;
  background-color: #fcfcfc; //색상표에 없는데 배경으로 사용되고 있음 문의하기
  padding-bottom: 10rem;
  /* margin-bottom: 20rem; */
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
