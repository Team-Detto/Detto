import styled from '@emotion/styled';
import WebContainer from 'components/common/WebContainer';
import { GiSprout } from 'react-icons/gi';

const PublicProfilePage = () => {
  return (
    <PublicProfileContainer>
      <WebContainer>
        <PublicProfileWrapper>
          <ProfileBox>
            <ProfileImg />
            <ProfileInfoBox>
              <NicknameAndMessageContainer>
                <UserInformationDiv>
                  <UserNicknameDiv>닉네임</UserNicknameDiv>
                  <UserPositionDiv>디자이너</UserPositionDiv>
                  <GiSprout />
                </UserInformationDiv>
                <MessageSendButton>쪽지보내기</MessageSendButton>
              </NicknameAndMessageContainer>
              <UserInfoObject>
                <UserInfoKey>연락처</UserInfoKey>
                <UserInfoValue>test@test.com</UserInfoValue>
              </UserInfoObject>
              <UserInfoObject>
                <UserInfoKey>기술스택</UserInfoKey>
                <UserSkillStackDiv>React</UserSkillStackDiv>
                <UserSkillStackDiv>React</UserSkillStackDiv>
                <UserSkillStackDiv>React</UserSkillStackDiv>
              </UserInfoObject>
            </ProfileInfoBox>
          </ProfileBox>
          <UserProjectWrapper>
            <UserDoingProjectDiv>
              닉네임 님이 현재 진행하고 있는 프로젝트
            </UserDoingProjectDiv>
          </UserProjectWrapper>
        </PublicProfileWrapper>
      </WebContainer>
    </PublicProfileContainer>
  );
};

export default PublicProfilePage;

const PublicProfileContainer = styled.div`
  background-color: #fafafb;
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

const ProfileImg = styled.div`
  width: 14.25rem;
  height: 14.25rem;
  background-color: #919191;
  border-radius: 50%;
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
  width: 6.25rem;
`;

const UserPositionDiv = styled.div`
  color: #6b7684;
  font-weight: 500;
`;

const MessageSendButton = styled.button`
  width: 9.8125rem;
  height: 3.5rem;
  background-color: #6f64f2;
  color: #fff;
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
  color: #828282;
`;

const UserInfoValue = styled.div`
  color: #828282;
`;

const UserSkillStackDiv = styled.div`
  background-color: #f2f4f6;
  font-size: 0.75rem;
  border-radius: 0.625rem;
  padding: 0 0.75rem;
`;

const UserProjectWrapper = styled.div`
  margin-top: 7.875rem;
  font-size: 1.25rem;
  font-weight: 500;
`;

const UserDoingProjectDiv = styled.div``;
