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
                onApplyModalStateChangeEvent={handleApplyModalOpenChange} //지원하기
                onCloseModalStateChangeEvent={handleCloseModalOpenChange} //지원취소, 마감하기
              />
              {/* //지원 안했다면 지원하기 모달 */}
              <ApplyModal
                isOpen={isApply}
                onClickEvent={handleApplyModalCloseChange}
                positions={projectData?.positions}
                pid={pid}
              />
              {/* //지원 했다면 Alert*/}
              <ConfirmAlert
                isOpen={isClose}
                message={
                  isApplicant
                    ? '지원을 취소하시겠습니까?'
                    : '지원공고를 마감할까요?'
                }
                subMessage={
                  isApplicant
                    ? '정말 취소 하실건지 확인해주세요!'
                    : '팀원이 모두 모집되었는지 한 번 더 확인해주세요!'
                }
                onClickEvent={() => {
                  isApplicant
                    ? (handleCloseModalCloseChange(), deleteApplicantMutate())
                    : handleAuthorButtonClick();
                }}
                onCloseEvent={handleCloseModalCloseChange}
              />
              {/* currentUser랑 글쓴이uid랑 같고 모집중이면 지원자 목록 보이게하기 */}
              {projectData?.uid === uid &&
                projectData?.isRecruiting === true && (
                  <ApplicantListArea
                    projectData={projectData}
                    userData={userData}
                    pid={pid}
                  />
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
  background-color: #fcfcfc; //색상표에 없는데 배경으로 사용되고 있음 문의하기
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
