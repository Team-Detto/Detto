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
  height: 1320px;
`;

const PublicProfileWrapper = styled.div`
  width: 1170px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 228px;
  margin-top: 204px;
  display: flex;
  align-items: center;
  gap: 39px;
`;

const ProfileImg = styled.div`
  width: 228px;
  height: 228px;
  background-color: #919191;
  border-radius: 50%;
`;

const ProfileInfoBox = styled.div`
  width: 884px;
  height: 166px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
`;

const NicknameAndMessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInformationDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserNicknameDiv = styled.div`
  font-size: 24px;
  font-weight: 500;
  width: 100px;
`;

const UserPositionDiv = styled.div`
  color: #6b7684;
  font-weight: 500;
`;

const MessageSendButton = styled.button`
  width: 157px;
  height: 56px;
  background-color: #6f64f2;
  color: #fff;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserInfoKey = styled.div`
  width: 100px;
  color: #828282;
`;

const UserInfoValue = styled.div`
  color: #828282;
`;

const UserSkillStackDiv = styled.div`
  background-color: #f2f4f6;
  font-size: 12px;
  border-radius: 10px;
  padding: 0 12px;
`;

const UserProjectWrapper = styled.div`
  margin-top: 126px;
  font-size: 20px;
  font-weight: 500;
`;

const UserDoingProjectDiv = styled.div``;
