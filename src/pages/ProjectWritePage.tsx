import WebContainer from 'components/common/WebContainer';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  return (
    <WebContainer>
      <ProjectWritePageWrapper>
        <ProjectWritePageHeader />
        <ProjectWritePageBody />
        <ProjectWritePageFooter />
      </ProjectWritePageWrapper>
    </WebContainer>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
`;

export default ProjectWritePage;
