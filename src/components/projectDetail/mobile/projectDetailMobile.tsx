import styled from '@emotion/styled';
import MobileMemberInfoArea from './MobileMemberInfoArea';
import MobileRecruitContent from './MobileRecruitContent';
import MobileTitleThumbnailArea from './MobileTitleThumbnailArea';
import ViewsToShare from './MobileViewsToShareArea';
import WriterToProjectInfoArea from './MobileWirterToProjectInfoArea';

const ProjectDetailMobile = ({ pid, projectData, userData }: any) => {
  return (
    <MobileContainer>
      <MobileTitleThumbnailArea pid={pid} projectData={projectData} />
      <ViewsToShare projectData={projectData} />
      <WriterToProjectInfoArea projectData={projectData} userData={userData} />
      <MobileMemberInfoArea applicantsData={projectData?.applicants} />
      <MobileRecruitContent content={projectData?.content} />
    </MobileContainer>
  );
};

export default ProjectDetailMobile;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 7rem 0 100rem 0;
  background-color: #fcfcfc;
`;
