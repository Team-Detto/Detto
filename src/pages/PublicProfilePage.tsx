import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import WebContainer from 'components/common/WebContainer';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import ProjectList from 'components/common/myProjectList/ProjectList';
import MobilePublicProfilePage from 'components/publicProfile/mobile/MobilePublicProfilePage';
import { Helmet } from 'react-helmet-async';
import usePublicProfile from 'hooks/usePublicProfile';
import UserProfileBox from 'components/publicProfile/UserProfileBox';

const PublicProfilePage = () => {
  const {
    uid,
    stacks,
    openModal,
    handleSendNoteButtonClick,
    userInfoData,
    isMobile,
    activeProjectTab,
    handleProjectTabClick,
    userProjectListsData,
  } = usePublicProfile();

  if (!userInfoData) return null;

  // 탈퇴한 회원일 경우 메세지 표시
  if (!userInfoData.isActive) {
    if (isMobile)
      return <NoDataMessage mobile>탈퇴한 회원입니다 :/</NoDataMessage>;
    return <NoDataMessage>탈퇴한 회원입니다 :/</NoDataMessage>;
  }

  return (
    <>
      <Helmet>
        <title>{`${userInfoData.displayName} - Detto`}</title>
      </Helmet>
      {isMobile ? (
        <MobilePublicProfilePage
          userInfoData={userInfoData}
          activeProjectTab={activeProjectTab}
          handleProjectTabClick={handleProjectTabClick}
          pidList={userProjectListsData}
        />
      ) : (
        <PublicProfileContainer>
          <WebContainer>
            <PublicProfileWrapper>
              <UserProfileBox
                userInfoData={userInfoData}
                uid={uid}
                stacks={stacks}
                openModal={openModal}
                handleSendNoteButtonClick={handleSendNoteButtonClick}
              />
              <UserProjectWrapper>
                <ProjectsTab
                  type={'public'}
                  category={activeProjectTab}
                  onTabClick={handleProjectTabClick}
                />
                {userProjectListsData && (
                  <ProjectList
                    category={activeProjectTab}
                    pidList={userProjectListsData}
                  />
                )}
              </UserProjectWrapper>
            </PublicProfileWrapper>
          </WebContainer>
        </PublicProfileContainer>
      )}
    </>
  );
};

export default PublicProfilePage;

const PublicProfileContainer = styled.div`
  background-color: ${COLORS.gray50};
  height: 100%;
  padding-bottom: 10rem;
`;

const PublicProfileWrapper = styled.div`
  width: 73.125rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const UserProjectWrapper = styled.div`
  margin-top: 3.75rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

const NoDataMessage = styled.div<{ mobile?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 75vh;

  font-size: 1.25rem;
  font-weight: 700;
  color: ${COLORS.gray300};
`;
