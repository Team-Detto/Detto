import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth, useGlobalModal, useIsMobile, useProjectList } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import ProjectList from 'components/common/myProjectList/ProjectList';
import UserPositions from 'components/publicProfile/UserPositions';
import UserStacks from 'components/publicProfile/UserStacks';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';
import { concatSkills } from 'utils/skills';
import { staleTime } from 'utils/staleTime';
import { modalTypes } from 'components/common/modal/modal';
import MobilePublicProfilePage from 'components/publicProfile/mobile/MobilePublicProfilePage';
// import NoteIcon from 'assets/images/note_icon.png';
import { Helmet } from 'react-helmet-async';
import {
  amplitudeNeedToButtonClick,
  getCurrentPathName,
  logEvent,
} from 'utils/amplitude';
import { MobileNoteIcon } from 'components/MobileHeader';

const PublicProfilePage = () => {
  const { id } = useParams(); //받는사람 id
  const { uid } = useAuth(); //보내는 사람 id (현재 로그인한 유저)
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();
  const { openModalWithData, openModal } = useGlobalModal();
  const isMobile = useIsMobile();

  const { data: userInfoData } = useQuery({
    queryKey: ['users', id],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { data: userProjectListsData } = useQuery({
    queryKey: ['myProjects', id],
    queryFn: getUserProjectList,
    staleTime: staleTime.myProjects,
    enabled: !!id,
  });

  const handleSendNoteButtonClick = () => {
    openModalWithData(modalTypes.sendNote, {
      id: 'id', //addDoc이라 id 필요없음
      senderUid: uid,
      receiverUid: id as string,
      date: 0,
      title: '',
      content: '',
      isRead: false,
    });
    amplitudeNeedToButtonClick('sendNoteModal', 'sendNote');
  };

  const stacks = concatSkills(
    userInfoData?.plannerStack,
    userInfoData?.designerStack,
    userInfoData?.developerStack,
  );

  useEffect(() => {
    setActiveProjectTab('currentProjects');
    logEvent('Visit Page', {
      from: `${getCurrentPathName()}`,
      to: 'none',
      name: 'puplic_profile',
    });
  }, []);

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
              <ProfileBox>
                <ProfileImgBox>
                  <ProfileImg
                    src={userInfoData?.photoURL}
                    alt={userInfoData?.displayName}
                    referrerPolicy="no-referrer"
                  />
                  {userInfoData?.uid !== uid && (
                    <MessageSendButton
                      onClick={() => {
                        if (!uid) {
                          openModal('login', 0);
                          return;
                        }
                        handleSendNoteButtonClick();
                      }}
                    >
                      <NoteIcon />
                    </MessageSendButton>
                  )}
                </ProfileImgBox>
                <ProfileInfoBox>
                  <NicknameAndMessageContainer>
                    <UserInformationDiv>
                      <UserNicknameDiv>
                        {userInfoData?.displayName}
                      </UserNicknameDiv>
                      <UserPositions
                        positions={userInfoData?.positions}
                        isJunior={userInfoData?.isJunior}
                      />
                      {userInfoData?.uid === uid && (
                        <IfMyProfileDiv>내 프로필</IfMyProfileDiv>
                      )}
                    </UserInformationDiv>
                  </NicknameAndMessageContainer>
                  <UserInfoObject>
                    <UserInfoKey>연락처</UserInfoKey>
                    <UserInfoValue>
                      {userInfoData?.email.length === 0
                        ? '등록한 이메일이 없어요:/'
                        : userInfoData?.email}
                    </UserInfoValue>
                  </UserInfoObject>
                  <UserInfoObject>
                    <UserInfoKey>기술 스택</UserInfoKey>
                    <UserStacks stacks={stacks} />
                  </UserInfoObject>
                </ProfileInfoBox>
              </ProfileBox>
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

const ProfileBox = styled.div`
  width: 100%;
  min-height: 14.25rem;
  margin-top: 10rem;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  gap: 2.4375rem;
  background-color: ${COLORS.white};
`;

const ProfileImgBox = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 3rem;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ProfileInfoBox = styled.div`
  width: 55.25rem;
  height: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.25rem;
`;

const NicknameAndMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInformationDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1rem;
`;

const UserNicknameDiv = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  max-width: 10rem;
  margin-right: 1.25rem;
`;

const IfMyProfileDiv = styled.div`
  width: 5.625rem;
  height: 1.875rem;

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
`;

const MessageSendButton = styled.button`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  top: 19.5rem;
  left: 10.5rem;
  border-radius: 50%;
  border: 1px solid ${COLORS.white};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
  background-color: ${COLORS.violetB400};
`;

const UserInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
`;

const UserInfoKey = styled.div`
  min-width: 4.375rem;
  margin-right: 1rem;
  font-size: 1rem;
  color: ${COLORS.gray800};
`;

const UserInfoValue = styled.div`
  font-size: 1rem;
  color: ${COLORS.gray750};
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

const NoteIcon = styled(MobileNoteIcon)`
  color: ${COLORS.white};
`;
