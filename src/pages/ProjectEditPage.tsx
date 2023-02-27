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
import mobilesecondBanner from 'assets/images/mobilesecondBanner.png';
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
      <>
        <Helmet>
          <title>{`(작성중) ${editFormValue?.title} - Detto`}</title>

          <meta
            name="description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="(작성중) ${editFormValue?.title} - Detto"
          />
          <meta
            property="og:description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta property="og:site_name" content="Detto" />
          <meta property="og:url" content={window.location.href} />
          <meta
            property="og:image"
            content={editFormValue?.thumbnaile ?? mobilesecondBanner}
          />

          <meta name="twitter:title" content={`새 글 쓰기 - Detto`} />
          <meta
            name="twitter:description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta name="twitter:image" content={mobilesecondBanner} />

          <link rel="canonical" href={window.location.href} />
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
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`(작성중) ${editFormValue?.title} - Detto`}</title>

        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="(작성중) ${editFormValue?.title} - Detto"
        />
        <meta
          property="og:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta property="og:site_name" content="Detto" />
        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:image"
          content={editFormValue?.thumbnaile ?? mobilesecondBanner}
        />

        <meta name="twitter:title" content={`새 글 쓰기 - Detto`} />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="twitter:image" content={mobilesecondBanner} />

        <link rel="canonical" href={window.location.href} />
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
