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
import mobilesecondBanner from 'assets/images/mobilesecondBanner.png';
import styled from '@emotion/styled';

const ProjectWritePage = () => {
  const {
    isOpen,
    editRef,
    imageRef,
    showToast,
    isSubmitting,
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
      <>
        <Helmet>
          <title>{'새 글 쓰기 - Detto'}</title>

          <meta
            name="description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={'새 글 쓰기 - Detto'} />
          <meta property="og:site_name" content="Detto" />
          <meta
            property="description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta property="og:image" content={mobilesecondBanner} />
          <meta property="og:url" content={window.location.href} />

          <meta name="twitter:title" content={'새 글 쓰기 - Detto'} />
          <meta
            name="twitter:description"
            content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
          />
          <meta name="twitter:image" content={mobilesecondBanner} />

          <link rel="canonical" href={window.location.href} />
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
          {showToast && <ValidationToastPopup message={ToastMessage} />}
        </MobileContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'새 글 쓰기 - Detto'}</title>

        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={'새 글 쓰기 - Detto'} />
        <meta property="og:site_name" content="Detto" />
        <meta
          property="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta property="og:image" content={mobilesecondBanner} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:title" content={'새 글 쓰기 - Detto'} />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="twitter:image" content={mobilesecondBanner} />

        <link rel="canonical" href={window.location.href} />
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
