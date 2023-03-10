import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { MobileNoteIcon } from 'components/MobileHeader';
import { DocumentData } from 'firebase/firestore';
import UserPositions from './UserPositions';
import UserStacks from './UserStacks';

interface UserProfileBoxProps {
  userInfoData: DocumentData;
  uid: string;
  openModal: (modalName: string, modalIndex: number) => void;
  handleSendNoteButtonClick: () => void;
  stacks: string[];
}

const UserProfileBox = ({
  userInfoData,
  uid,
  openModal,
  handleSendNoteButtonClick,
  stacks,
}: UserProfileBoxProps) => {
  return (
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
            <UserNicknameDiv>{userInfoData?.displayName}</UserNicknameDiv>
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
  );
};

export default UserProfileBox;

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

const NoteIcon = styled(MobileNoteIcon)`
  color: ${COLORS.white};
`;
