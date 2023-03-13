import { useIsMobile, useWrite } from 'hooks';
import { Helmet } from 'react-helmet-async';
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
    isPrompt,
    editRef,
    imageRef,
    showToast,
    isSubmitting,
    ToastMessage,
    writeFormValue,
    setWriteFormValue,
    handleCalculate,
    handlePreventGoBack,
    handleFormValueChange,
    handleModalStateChange,
    handleModalCloseChange,
    handleAddThumbnailImage,
    handleAddThumbnailImageChange,
    handleCreateProjectButtonClick,
    handleCheckValidationButtonClick,
  } = useWrite();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>{'새 글 쓰기 - Detto'}</title>
        </Helmet>
        <MobileContainer>
          <WritePageMobileContainer>
            <WritePageMobileHeader
              writeFormValue={writeFormValue}
              onFormValueChangeEvent={handleFormValueChange}
            />
            <WritePageMobileBody
              imageRef={imageRef}
              writeFormValue={writeFormValue}
              setWriteFormValue={setWriteFormValue}
              onCalculateEvent={handleCalculate}
              onFormValueChangeEvent={handleFormValueChange}
              onAddThumbnailImageChangeEvent={handleAddThumbnailImageChange}
            />
            <WritePageMobileFooter
              editRef={editRef}
              onOpenButtonClickEvent={handleCheckValidationButtonClick}
            />
          </WritePageMobileContainer>
          <MobileConfirmAlert
            isOpen={isOpen}
            message="게시물을 업로드할까요?"
            subMessage="작성한 게시물은 마이페이지에서 볼 수 있습니다."
            disabled={isSubmitting}
            onCloseEvent={handleModalStateChange}
            onClickEvent={handleCreateProjectButtonClick}
          />
          <MobileConfirmAlert
            isOpen={isPrompt}
            message="게시글 작성을 취소하시겠습니까?"
            subMessage="작성 중인 게시글은 저장되지 않습니다."
            onClickEvent={handlePreventGoBack}
            onCloseEvent={handleModalCloseChange}
          />
          {showToast && <ValidationToastPopup message={ToastMessage} />}
        </MobileContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'새 글 쓰기 - Detto'}</title>
      </Helmet>
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
            onOpenButtonClickEvent={handleCheckValidationButtonClick}
          />
          <ConfirmAlert
            isOpen={isOpen}
            message="게시물을 업로드할까요?"
            subMessage="작성한 게시물은 마이페이지에서 볼 수 있습니다."
            onClickEvent={handleCreateProjectButtonClick}
            onCloseEvent={handleModalStateChange}
          />
          <ConfirmAlert
            isOpen={isPrompt}
            message="정말 나가시겠습니까?"
            subMessage="작성한 내용은 저장되지 않습니다."
            onClickEvent={handlePreventGoBack}
            onCloseEvent={handleModalCloseChange}
          />
          {showToast && <ValidationToastPopup message={ToastMessage} />}
        </ProjectWritePageWrapper>
      </WebContainer>
    </>
  );
};

const ProjectWritePageWrapper = styled.div`
  height: 133.5625rem;
`;
const WritePageMobileContainer = styled.div`
  height: 70.125rem;
`;

export default ProjectWritePage;
