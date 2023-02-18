import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useAuth, useGlobalModal, useProjectList } from 'hooks';
import WebContainer from 'components/common/WebContainer';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import ProjectList from 'components/common/myProjectList/ProjectList';
import UserPositions from 'components/publicProfile/UserPositions';
import UserStacks from 'components/publicProfile/UserStacks';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';
import COLORS from 'assets/styles/colors';
import { concatSkills } from 'utils/skills';
import { staleTime } from 'utils/staleTime';
import { modalTypes } from 'components/common/modal/modal';

const PublicProfilePage = () => {
  const { id } = useParams(); //받는사람 id
  const { uid } = useAuth(); //보내는 사람 id (현재 로그인한 유저)
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();
  const { openModalWithData } = useGlobalModal();

  const { data: userInfoData }: any = useQuery({
    queryKey: ['users', id],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
  });

  const { data: userProjectListsData }: any = useQuery({
    queryKey: ['myProjects', id],
    queryFn: getUserProjectList,
    staleTime: staleTime.myProjects,
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
  };

  const stacks = concatSkills(
    userInfoData?.plannerStack,
    userInfoData?.designerStack,
    userInfoData?.developerStack,
  );

  useEffect(() => {
    setActiveProjectTab('currentProjects');
  }, []);

  return (
    <PublicProfileContainer>
      <WebContainer>
        <PublicProfileWrapper>
          <ProfileBox>
            <ProfileImgBox>
              <ProfileImg
                src={userInfoData?.photoURL}
                alt={userInfoData?.displayName}
              />
            </ProfileImgBox>
            <ProfileInfoBox>
              <NicknameAndMessageContainer>
                <UserInformationDiv>
                  <UserNicknameDiv>{userInfoData?.displayName}</UserNicknameDiv>
                  <UserPositions
                    positions={userInfoData?.positions}
                    isJunior={userInfoData?.isJunior}
                  />
                  {userInfoData?.uid === uid && (
                    <IfMyProfileDiv>내 프로필</IfMyProfileDiv>
                  )}
                </UserInformationDiv>
                {userInfoData?.uid !== uid && (
                  <MessageSendButton onClick={handleSendNoteButtonClick}>
                    쪽지보내기
                  </MessageSendButton>
                )}
              </NicknameAndMessageContainer>
              <UserInfoObject>
                <UserInfoKey>연락처</UserInfoKey>
                <UserInfoValue>{userInfoData?.email}</UserInfoValue>
              </UserInfoObject>
              <UserInfoObject>
                <UserInfoKey>기술스택</UserInfoKey>
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
  );
};

export default PublicProfilePage;

const PublicProfileContainer = styled.div`
  background-color: ${COLORS.gray50};
  height: 82.5rem;
`;

const PublicProfileWrapper = styled.div`
  width: 73.125rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 14.25rem;
  margin-top: 12.75rem;
  display: flex;
  align-items: center;
  gap: 2.4375rem;
`;

const ProfileImgBox = styled.div`
  width: 14.25rem;
  height: 14.25rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const ProfileInfoBox = styled.div`
  width: 55.25rem;
  height: 10.375rem;
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
`;

const UserNicknameDiv = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  max-width: 10rem;
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
  width: 9.8125rem;
  height: 3.5rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const UserInfoKey = styled.div`
  width: 6.25rem;
  color: #828282; //색상표에 없는데 사용되고 있음. 문의하기
`;

const UserInfoValue = styled.div`
  color: #828282; //색상표에 없는데 사용되고 있음. 문의하기
`;

const UserSkillStackDiv = styled.div`
  display: flex;
  align-items: center;

  height: 2rem;
  padding: 0 0.75rem;
  background-color: ${COLORS.gray100};
  border-radius: 2rem;

  font-size: 0.75rem;
  color: ${COLORS.black};

  cursor: default;
`;

const UserProjectWrapper = styled.div`
  margin-top: 7.875rem;
  font-size: 1.25rem;
  font-weight: 500;
`;
