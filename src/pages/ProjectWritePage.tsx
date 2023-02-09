import useModal from 'hooks/useModal';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  const { isOpen, handleOpenButtonClick, handleCloseButtonClick } =
    useModal(false);
  return (
    <WebContainer>
      <ProjectWritePageWrapper isOpen={isOpen}>
        <ProjectWritePageHeader />
        <ProjectWritePageBody />
        <ProjectWritePageFooter
          onOpenButtonClickEvent={handleOpenButtonClick}
        />
        <ConfirmAlert
          isOpen={isOpen}
          onClickEvent={handleCloseButtonClick}
          message="테스트"
        />
      </ProjectWritePageWrapper>
    </WebContainer>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
  position: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'fixed' : 'static'};
  top: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `-${window.scrollY}px` : '0'};
  overflow-y: ${(props: { isOpen: boolean }) =>
    props.isOpen ? 'scroll' : 'hidden'};
`;

export default ProjectWritePage;
