import { useEditBoard, useIsMobile } from 'hooks';
import { Helmet } from 'react-helmet-async';
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
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { deletedPidState } from '../recoil/atoms';

const ProjectEditPage = () => {
  const {
    isOpen,
    isPrompt,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    editFormValue,
    setEditFormValue,
    handleCalculate,
    handlePreventGoBack,
    handleFormValueChange,
    handleModalStateChange,
    handleModalCloseChange,
    handleAddThumbnailImage,
    handleEditProjectButtonClick,
    handleAddThumbnailImageChange,
    handleCheckValidationButtonClick,
  } = useEditBoard();
  const isMobile = useIsMobile();

  const deletedPid = useRecoilValue(deletedPidState);
  //이 페이지가 delete된 후에 넘어왔다면 메인페이지로 이동
  useEffect(() => {
    if (deletedPid) {
      window.location.href = '/';
    }
  }, [deletedPid]);

  if (isMobile) {
    return (
      <>
        <Helmet>
          <title>{`(작성중) ${editFormValue?.title} - Detto`}</title>
        </Helmet>
        <MobileContainer>
          <EditPageMobileContainer>
            <EditPageMobileHeader
              editFormValue={editFormValue}
              onFormValueChangeEvent={handleFormValueChange}
            />
            <EditPageMobileBody
              imageRef={imageRef}
              editFormValue={editFormValue}
              setEditFormValue={setEditFormValue}
              onCalculateEvent={handleCalculate}
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
            <MobileConfirmAlert
              isOpen={isPrompt}
              message="게시글 작성을 취소하시겠습니까?"
              subMessage="작성 중인 게시글은 저장되지 않습니다."
              onClickEvent={handlePreventGoBack}
              onCloseEvent={handleModalCloseChange}
            />
            {showToast && <ValidationToastPopup message={ToastMessage} />}
          </EditPageMobileContainer>
        </MobileContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`(작성중) ${editFormValue?.title} - Detto`}</title>
      </Helmet>
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
          <ConfirmAlert
            isOpen={isPrompt}
            message="정말 나가시겠습니까?"
            subMessage="작성한 내용은 저장되지 않습니다."
            onClickEvent={handlePreventGoBack}
            onCloseEvent={handleModalCloseChange}
          />
          {showToast && <ValidationToastPopup message={ToastMessage} />}
        </EditPageWrapper>
      </WebContainer>
    </>
  );
};

const EditPageWrapper = styled.div`
  height: 133.5625rem;
`;
const EditPageMobileContainer = styled.div`
  height: 78rem;
`;

export default ProjectEditPage;
