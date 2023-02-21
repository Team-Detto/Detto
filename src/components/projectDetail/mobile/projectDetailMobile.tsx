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

const ProjectDetailMobile = ({ pid, projectData, userData }: any) => {
  const { uid } = useAuth();

  const {
    isOpen: isApply,
    handleModalOpenChange: handleApplyModalOpenChange,
    handleModalCloseChange: handleApplyModalCloseChange,
  } = useModal(false);

  return (
    <MobileContainer>
      <TitleThumbnailArea pid={pid} projectData={projectData} />
      <ViewsToShareArea projectData={projectData} />
      <WriterToProjectInfoArea projectData={projectData} userData={userData} />
      <MemberInfoArea applicantsData={projectData?.applicants} />
      <RecruitContentArea content={projectData?.content} />
      {projectData?.uid !== uid && (
        <ApplyButtonArea handleModalOpenChange={handleApplyModalOpenChange} />
      )}
      {projectData?.uid === uid && (
        <ApplicantsList applicants={projectData?.applicants} />
      )}
      <ApplyModal
        isOpen={isApply}
        message="프로젝트를 지원해볼까요?"
        onClickEvent={handleApplyModalCloseChange}
        pid={pid}
      />
    </MobileContainer>
  );
};

export default ProjectDetailMobile;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 7rem 0 5rem 0;
  background-color: #fcfcfc;
`;
