import { useWrite } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  const {
    isOpen,
    editRef,
    writeFormValue,
    handleFormValueChange,
    handleModalStateChange,
    handleCreateProjectButtonClick,
  } = useWrite();

  return (
    <WebContainer>
      <ProjectWritePageWrapper>
        <ProjectWritePageHeader
          writeFormValue={writeFormValue}
          onFormValueChangeEvent={handleFormValueChange}
        />
        <ProjectWritePageBody
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={handleFormValueChange}
        />
        <ProjectWritePageFooter
          editRef={editRef}
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={handleFormValueChange}
          onOpenButtonClickEvent={handleModalStateChange}
        />
        <ConfirmAlert
          isOpen={isOpen}
          message="게시글을 작성하시겠습니까?"
          onClickEvent={handleCreateProjectButtonClick}
          onCloseEvent={handleModalStateChange}
        />
      </ProjectWritePageWrapper>
    </WebContainer>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
`;

export default ProjectWritePage;
