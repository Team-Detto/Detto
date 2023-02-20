import { useIsMobile, useWrite } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import MobileContainer from 'components/common/mobile/MobileContainer';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import ProjectWritePageBody from 'components/writepage/ProjectWritePageBody';
import ProjectWritePageFooter from 'components/writepage/ProjectWritePageFooter';
import ProjectWritePageHeader from 'components/writepage/ProjectWritePageHeader';
import WritePageMobileHeader from 'components/writepage/mobile/WritePageMobileHeader';
import WritePageMobileBody from 'components/writepage/mobile/WritePageMobileBody';
import WritePageMobileFooter from 'components/writepage/mobile/WritePageMobileFooter';
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
    handleAddThumbnailImageChange,
    handleCreateProjectButtonClick,
    handleCheckValidationButtonClick,
  } = useWrite();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileContainer>
        <WritePageMobileContainer>
          <WritePageMobileHeader />
          <WritePageMobileBody />
          <WritePageMobileFooter
            editRef={editRef}
            onOpenButtonClickEvent={handleCheckValidationButtonClick}
          />
        </WritePageMobileContainer>
        <MobileConfirmAlert
          isOpen={isOpen}
          message="게시물을 업로드할까요?"
          subMessage="작성한 게시물은 마이페이지에서 볼 수 있습니다."
          onClickEvent={handleCreateProjectButtonClick}
          onCloseEvent={handleModalStateChange}
        />
      </MobileContainer>
    );
  }

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
          onFormValueChangeEvent={handleFormValueChange}
          onAddThumbnailImageEvent={handleAddThumbnailImage}
          onAddThumbnailImageChangeEvent={handleAddThumbnailImageChange}
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
const WritePageMobileContainer = styled.div`
  height: 63.5rem;
`;

export default ProjectWritePage;
