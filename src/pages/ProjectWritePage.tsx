import { useModal, useWrite } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  const { isOpen, handleOpenButtonClick, handleCloseButtonClick } =
    useModal(false);
  const {
    writeFormValue,
    handleFormValueChange,
    handleCreateProjectButtonClick,
  } = useWrite();

  return (
    <WebContainer>
      <ProjectWritePageWrapper isOpen={isOpen}>
        <ProjectWritePageHeader
          writeFormValue={writeFormValue}
          onFormValueChangeEvent={handleFormValueChange}
        />
        <ProjectWritePageBody
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={handleFormValueChange}
        />
        <ProjectWritePageFooter
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={handleFormValueChange}
          onOpenButtonClickEvent={handleOpenButtonClick}
        />
        <ConfirmAlert
          isOpen={isOpen}
          message="게시글을 작성하시겠습니까?"
          onClickEvent={handleCreateProjectButtonClick}
          onCloseEvent={handleCloseButtonClick}
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
