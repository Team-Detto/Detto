import styled from '@emotion/styled';
import TitleThumbnailArea from './MobileTitleThumbnailArea';
import ViewsToShareArea from './MobileViewsToShareArea';
import WriterToProjectInfoArea from './MobileWriterToProjectInfoArea';
import MemberInfoArea from './MobileMemberInfoArea';
import RecruitContentArea from './MobileRecruitContentArea';
import ApplicantsList from './MobileApplicantsList';
import ApplyButtonArea from './MobileApplyButtonArea';
import { useAuth, useModal } from 'hooks';
import ApplyModal from '../ApplyModal/ApplyModal';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import EndRecruitButton from './EndRecruitButton';

const ProjectDetailMobile = ({
  pid,
  projectData,
  userData,
  isApplicant,
  deleteApplicantMutate,
  handleAuthorButtonClick,
}: any) => {
  const { uid } = useAuth();

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

  return (
    <MobileContainer>
      <TitleThumbnailArea pid={pid} projectData={projectData} />
      <ViewsToShareArea pid={pid} projectData={projectData} />
      <WriterToProjectInfoArea projectData={projectData} userData={userData} />
      <MemberInfoArea applicantsData={projectData?.applicants} />
      <RecruitContentArea content={projectData?.content} />
      {projectData?.uid !== uid && ( //작성자가 아니면 지원하기 머튼 보여주기
        <ApplyButtonArea
          isApplicant={isApplicant}
          projectData={projectData}
          handleModalOpenChange={handleApplyModalOpenChange}
          onCloseModalStateChangeEvent={handleCloseModalOpenChange} // 지원 취소 Alert 띄우기
        />
      )}
      {projectData?.uid === uid && (
        <>
          <ApplicantsList pid={pid} applicants={projectData?.applicants} />
          <EndRecruitButton
            onClick={handleCloseModalOpenChange}
            isRecruiting={projectData?.isRecruiting}
          />
        </>
      )}

      <ApplyModal
        isOpen={isApply}
        message="프로젝트를 지원해볼까요?"
        onClickEvent={handleApplyModalCloseChange}
        pid={pid}
      />
      <MobileConfirmAlert
        isOpen={isClose}
        message={
          isApplicant ? '지원을 취소하시겠습니까?' : '지원공고를 마감할까요?'
        }
        subMessage={
          isApplicant
            ? '정말 취소 하실건지 확인해주세요!'
            : '팀원이 모두 모집되었는지 한 번 더 확인해주세요!'
        }
        onClickEvent={() => {
          isApplicant
            ? (handleCloseModalCloseChange(), deleteApplicantMutate())
            : (handleCloseModalCloseChange(), handleAuthorButtonClick());
        }}
        onCloseEvent={handleCloseModalCloseChange}
      />
    </MobileContainer>
  );
};

export default ProjectDetailMobile;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 0 5rem 0;
  background-color: #fcfcfc;
`;
