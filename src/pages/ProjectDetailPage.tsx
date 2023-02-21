import { MouseEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteApplicant,
  firebaseGetIsApplicantRequest,
  updateRecruiting,
  viewProject,
} from 'apis/postDetail';
import { useIsMobile, useToastPopup } from 'hooks';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import WebContainer from '../components/common/WebContainer';
import ConfirmAlert from 'components/common/ConfirmAlert';
import TitleThumbnailArea from 'components/projectDetail/TitleThumbnailArea';
import WriterToShareArea from 'components/projectDetail/WriterToShareArea';
import ProjectInfoArea from 'components/projectDetail/ProjectInfoArea';
import MemberInfoArea from 'components/projectDetail/MemberInfoArea';
import ContentArea from 'components/projectDetail/ContentArea';
import ApplyButtonArea from 'components/projectDetail/ApplyButtonArea';
import ApplicantListArea from 'components/projectDetail/ApplicantListArea';
import MobileProjectDetailPage from 'components/projectDetail/mobile/projectDetailMobile';
import { useAuth, useModal, useNotification } from 'hooks';
import ApplyModal from 'components/projectDetail/ApplyModal/ApplyModal';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const ProjectDetailPage = () => {
  const params = useParams();
  const pid = params?.id;

  const [share, setShare] = useState(false);
  const [isCopyLink, setIsCopyLink] = useState(false);

  const sendNotification = useNotification();
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  //프로젝트 데이터 조회
  const { data: projectData } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => viewProject(pid),
  });

  const { uid } = useAuth(); // 현재 사용자
  const writer = projectData?.uid; //글쓴이

  //글쓴이 조회
  const { data: userData } = useQuery({
    queryKey: ['users', writer],
    queryFn: () => findWithCollectionName('users', writer), //여기서 TypeError: Cannot read property of undefined 에러남 https://github.com/microsoft/vscode/issues/116219
  });

  // 현재 유저가 프로젝트 지원자 인가 조회
  const { data: isApplicant } = useQuery({
    queryKey: ['post', projectData?.applicants],
    queryFn: () => firebaseGetIsApplicantRequest(pid, uid),
  });

  const queryClient = useQueryClient();
  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(pid as string, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]); //마감하기 버튼 성공시 렌더링
        queryClient.invalidateQueries(['post', 'mostViewed']);
        queryClient.invalidateQueries(['post', 'mostLiked']);
      },
    },
  );

  const { mutate: deleteApplicantMutate } = useMutation(
    () => deleteApplicant(pid as string, uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]); //지원취소 버튼 성공시 렌더링
      },
    },
  );

  // 지원자에게 마감 알림 보내기
  const sendDeadlineNotificationToApplicants = () => {
    // applicants map을 array로 변경
    const applicantsUidArray = Object.keys(projectData?.applicants);

    applicantsUidArray.forEach((applicant: any) => {
      sendNotification({
        title: '지원하신 프로젝트의 모집이 마감되었습니다.',
        receiverUid: applicant,
        link: {
          type: 'project',
          id: params.id!,
        },
      });
    });
  };

  // 마감하기 버튼 이벤트 핸들러
  const handleAuthorButtonClick = () => {
    sendDeadlineNotificationToApplicants();
    updateRecruitingMutate(pid as any, false as any);
    handleCloseModalCloseChange();
  };

  const handleShareButtonClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShare(!share);
  };

  const handleCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    handleToastPopup('링크가 복사되었습니다.');
    setIsCopyLink(true);
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
  const isMobile = useIsMobile();
  if (isMobile && projectData) {
    return (
      <MobileProjectDetailPage
        pid={pid}
        projectData={projectData}
        userData={userData}
      />
    );
  }

  return (
    <ProjectDetailContainer onClick={() => setShare(false)}>
      {projectData && (
        <WebContainer>
          <ProjectDetailWrapper>
            <TitleThumbnailArea projectData={projectData} pid={pid} />
            <WriterToShareArea
              pid={pid}
              share={share}
              userData={userData}
              showToast={showToast}
              isCopyLink={isCopyLink}
              projectData={projectData}
              ToastMessage={ToastMessage}
              onShareButtonClickEvent={handleShareButtonClick}
              onCopyLinkButtonClickEvent={handleCopyLinkButtonClick}
            />
            <RecruitmentInfoContainer>
              <ProjectInfoArea projectData={projectData} />
              <MemberInfoArea applicantsData={projectData?.applicants} />
            </RecruitmentInfoContainer>
            <ContentArea projectData={projectData} />
          </ProjectDetailWrapper>
          <ApplyButtonArea
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
              pid={pid}
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
