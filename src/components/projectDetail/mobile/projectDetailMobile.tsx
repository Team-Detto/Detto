import styled from '@emotion/styled';
import MobileMemberInfoArea from './MobileMemberInfoArea';
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
    </MobileContainer>
  );
};

export default ProjectDetailMobile;

const MobileContainer = styled.div`
  width: 100%;
  height: 1256px;
  padding-top: 7rem;
  background-color: #fcfcfc;
`;
