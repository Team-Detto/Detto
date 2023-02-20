import styled from '@emotion/styled';
import MobileTitleThumbnailArea from './MobileTitleThumbnailArea';
import ViewsToShare from './ViewsToShareArea';
import WriterToProjectInfoArea from './WirterToProjectInfoArea';

const ProjectDetailMobile = ({ pid, projectData, userData }: any) => {
  return (
    <MobileContainer>
      <MobileTitleThumbnailArea pid={pid} projectData={projectData} />
      <ViewsToShare projectData={projectData} />
      <WriterToProjectInfoArea projectData={projectData} userData={userData} />
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
