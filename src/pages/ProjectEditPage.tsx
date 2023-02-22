import { useEditBoard, useIsMobile } from 'hooks';
import ConfirmAlert from 'components/common/ConfirmAlert';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import WebContainer from 'components/common/WebContainer';
import MobileContainer from 'components/common/mobile/MobileContainer';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import ProjectEditPageHeader from 'components/editpage/ProjectEditPageHeader';
import ProjectEditPageBody from 'components/editpage/ProjectEditPageBody';
import ProjectEditPageFooter from 'components/editpage/ProjectEditPageFooter';
import EditPageMobileHeader from 'components/editpage/mobile/EditPageMobileHeader';
import EditPageMobileBody from 'components/editpage/mobile/EditPageMobileBody';
import EditPageMobileFooter from 'components/editpage/mobile/EditPageMobileFooter';
import styled from '@emotion/styled';

const ProjectEditPage = () => {
  const {
    isOpen,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    editThumbnail,
    editFormValue,
    setEditFormValue,
    handleFormValueChange,
    handleModalStateChange,
    handleAddThumbnailImage,
    handleEditProjectButtonClick,
    handleAddThumbnailImageChange,
    handleCheckValidationButtonClick,
  } = useEditBoard();
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <MobileContainer>
        <EditPageMobileContainer>
          <EditPageMobileHeader
            editFormValue={editFormValue}
            onFormValueChangeEvent={handleFormValueChange}
          />
          <EditPageMobileBody
            imageRef={imageRef}
            editFormValue={editFormValue}
            editThumbnail={editThumbnail}
            setEditFormValue={setEditFormValue}
            onFormValueChangeEvent={handleFormValueChange}
            onAddThumbnailImageChangeEvent={handleAddThumbnailImageChange}
          />
          <EditPageMobileFooter
            editRef={editRef}
            editFormValue={editFormValue}
            onModalStateChangeEvent={handleCheckValidationButtonClick}
          />
          <MobileConfirmAlert
            isOpen={isOpen}
            message="게시글을 수정하시겠습니까?"
            subMessage="수정한 게시글은 마이페이지에서 볼 수 있습니다."
            onClickEvent={handleEditProjectButtonClick}
            onCloseEvent={handleModalStateChange}
          />
          {showToast && <ValidationToastPopup message={ToastMessage} />}
        </EditPageMobileContainer>
      </MobileContainer>
    );
  }

  return (
    <WebContainer>
      <EditPageWrapper>
        <ProjectEditPageHeader
          editFormValue={editFormValue}
          onFormValueChangeEvent={handleFormValueChange}
        />
        <ProjectEditPageBody
          imageRef={imageRef}
          editFormValue={editFormValue}
          setEditFormValue={setEditFormValue}
          onFormValueChangeEvent={handleFormValueChange}
          onAddThumbnailImageEvent={handleAddThumbnailImage}
          onAddThumbnailImageChangeEvent={handleAddThumbnailImageChange}
        />
        <ProjectEditPageFooter
          editRef={editRef}
          editFormValue={editFormValue}
          onModalStateChangeEvent={handleCheckValidationButtonClick}
        />
        <ConfirmAlert
          isOpen={isOpen}
          message="게시글을 수정하시겠습니까?"
          subMessage="수정한 게시글은 마이페이지에서 확인할 수 있습니다."
          onClickEvent={handleEditProjectButtonClick}
          onCloseEvent={handleModalStateChange}
        />
        {showToast && <ValidationToastPopup message={ToastMessage} />}
      </EditPageWrapper>
    </WebContainer>
  );
};

const EditPageWrapper = styled.div`
  height: 133.5625rem;
`;
const EditPageMobileContainer = styled.div`
  height: 70.125rem;
`;

export default ProjectEditPage;
