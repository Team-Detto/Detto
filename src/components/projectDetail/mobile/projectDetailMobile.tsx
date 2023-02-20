import styled from '@emotion/styled';
import TitleThumbnailArea from './MobileTitleThumbnailArea';
import ViewsToShareArea from './MobileViewsToShareArea';
import WriterToProjectInfoArea from './MobileWirterToProjectInfoArea';
import MemberInfoArea from './MobileMemberInfoArea';
import RecruitContentArea from './MobileRecruitContentArea';
import ApplicantsList from './MobileApplicantsList';
import ApplyButtonArea from './MobileApplyButtonArea';

const ProjectDetailMobile = ({ pid, projectData, userData }: any) => {
  return (
    <MobileContainer>
      <TitleThumbnailArea pid={pid} projectData={projectData} />
      <ViewsToShareArea projectData={projectData} />
      <WriterToProjectInfoArea projectData={projectData} userData={userData} />
      <MemberInfoArea applicantsData={projectData?.applicants} />
      <RecruitContentArea content={projectData?.content} />
      <ApplyButtonArea projectData={projectData} />
      <ApplicantsList applicants={projectData?.applicants} />
    </MobileContainer>
  );
};

export default ProjectDetailMobile;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 7rem 0 10rem 0;
  background-color: #fcfcfc;
`;
