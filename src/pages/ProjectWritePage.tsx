import { useWrite } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  const {
    isOpen,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    writeFormValue,
    setWriteFormValue,
    handleFormValueChange,
    handleModalStateChange,
    handleAddThumbnailImage,
    handleCreateProjectButtonClick,
    handleCheckValidationButtonClick,
  } = useWrite();

  return (
    <WebContainer>
      <ProjectWritePageWrapper>
        <ProjectWritePageHeader
          writeFormValue={writeFormValue}
          onFormValueChangeEvent={handleFormValueChange}
        />
        <ProjectWritePageBody
          imageRef={imageRef}
          writeFormValue={writeFormValue}
          setWriteFormValue={setWriteFormValue}
          onFormValueChagneEvent={handleFormValueChange}
          onAddThumbnailImageEvent={handleAddThumbnailImage}
        />
        <ProjectWritePageFooter
          editRef={editRef}
          writeFormValue={writeFormValue}
          onOpenButtonClickEvent={handleCheckValidationButtonClick}
        />
        <ConfirmAlert
          isOpen={isOpen}
          message="게시물을 업로드할까요?"
          subMessage="작성한 게시물은 마이페이지에서 볼 수 있습니다."
          onClickEvent={handleCreateProjectButtonClick}
          onCloseEvent={handleModalStateChange}
        />
        {showToast && <ValidationToastPopup message={ToastMessage} />}
      </ProjectWritePageWrapper>
    </WebContainer>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
`;

export default ProjectWritePage;
