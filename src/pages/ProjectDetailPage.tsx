import { useEffect } from 'react';
import WebContainer from '../components/common/WebContainer';
import ConfirmAlert from 'components/common/ConfirmAlert';
import TitleThumbnailArea from 'components/projectDetail/TitleThumbnailArea';
import WriterToShareArea from 'components/projectDetail/WriterToShareArea';
import ProjectInfoArea from 'components/projectDetail/ProjectInfoArea';
import MemberInfoArea from 'components/projectDetail/MemberInfoArea';
import ContentArea from 'components/projectDetail/ContentArea';
import ApplyButtonArea from 'components/projectDetail/ApplyButtonArea';
import ApplicantListArea from 'components/projectDetail/ApplicantListArea';
import MobileProjectDetailPage from 'components/projectDetail/mobile/projectDetailMobile';
import ApplyModal from 'components/projectDetail/ApplyModal/ApplyModal';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import useDetailProject from 'hooks/useDetailProject';
import { Helmet } from 'react-helmet-async';

const ProjectDetailPage = () => {
  const {
    pid,
    uid,
    projectData,
    userData,
    isApplicant,
    isMobile,
    isApply,
    isClose,
    handleApplyModalOpenChange,
    handleApplyModalCloseChange,
    handleCloseModalOpenChange,
    handleCloseModalCloseChange,
    handleAuthorButtonClick,
    deleteApplicantMutate,
  } = useDetailProject();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{projectData && `${projectData.title} - Detto`}</title>
      </Helmet>
      {isMobile ? (
        <>
          {projectData && (
            <MobileProjectDetailPage
              pid={pid}
              projectData={projectData}
              userData={userData}
              isApplicant={isApplicant}
              deleteApplicantMutate={deleteApplicantMutate}
              handleAuthorButtonClick={() => handleAuthorButtonClick()}
            />
          )}
        </>
      ) : (
        <ProjectDetailContainer>
          {projectData && (
            <WebContainer>
              <ProjectDetailWrapper>
                <TitleThumbnailArea projectData={projectData} pid={pid} />
                <WriterToShareArea
                  pid={pid}
                  userData={userData}
                  projectData={projectData}
                />
                <RecruitmentInfoContainer>
                  <ProjectInfoArea projectData={projectData} />
                  <MemberInfoArea applicantsData={projectData.applicants} />
                </RecruitmentInfoContainer>
                <ContentArea projectData={projectData} />
              </ProjectDetailWrapper>
              <ApplyButtonArea
                isApplicant={isApplicant}
                projectData={projectData}
                onApplyModalStateChangeEvent={handleApplyModalOpenChange} //????????????
                onCloseModalStateChangeEvent={handleCloseModalOpenChange} //????????????, ????????????
              />
              {/* //?????? ???????????? ???????????? ?????? */}
              <ApplyModal
                isOpen={isApply}
                onClickEvent={handleApplyModalCloseChange}
                positions={projectData?.positions}
                pid={pid}
              />
              {/* //?????? ????????? Alert*/}
              <ConfirmAlert
                isOpen={isClose}
                message={
                  isApplicant
                    ? '????????? ?????????????????????????'
                    : '??????????????? ????????????????'
                }
                subMessage={
                  isApplicant
                    ? '?????? ?????? ???????????? ??????????????????!'
                    : '????????? ?????? ?????????????????? ??? ??? ??? ??????????????????!'
                }
                onClickEvent={() => {
                  isApplicant
                    ? (handleCloseModalCloseChange(), deleteApplicantMutate())
                    : handleAuthorButtonClick();
                }}
                onCloseEvent={handleCloseModalCloseChange}
              />
              {/* currentUser??? ?????????uid??? ?????? ??????????????? ????????? ?????? ??????????????? */}
              {projectData?.uid === uid &&
                projectData?.isRecruiting === true && (
                  <ApplicantListArea projectData={projectData} pid={pid} />
                )}
            </WebContainer>
          )}
        </ProjectDetailContainer>
      )}
    </>
  );
};

export default ProjectDetailPage;

const ProjectDetailContainer = styled.div`
  min-height: 100vh;
  max-height: 100%;
  background-color: #fcfcfc; //???????????? ????????? ???????????? ???????????? ?????? ????????????
  padding-bottom: 10rem;
  /* margin-bottom: 20rem; */
`;

const ProjectDetailWrapper = styled.div`
  width: 73.75rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const RecruitmentInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 73.75rem;
  height: 100%;
  background-color: ${COLORS.white};
  margin-top: 3.5rem;
  align-items: center;
  padding: 2.5rem;
`;
