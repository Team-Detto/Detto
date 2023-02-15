import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import {
  useAuth,
  useGlobalModal,
  useProfileImage,
  useUpdateProfile,
} from 'hooks';
import ModalNavigator from '../common/ModalNavigator';
import ConfirmButton from './ConfirmButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserInfoData, updateUserInfoData } from 'apis/mypageUsers';
import { useEffect } from 'react';
import MyPageProfileImage from 'components/mypage/MyPageProfileImage';
import TextInput from 'components/mypage/TextInput';

// 페이지 3 : 프로필 사진, 닉네임 변경
const page = 3;

export default function SetProfile() {
  const { openModal } = useGlobalModal();

  const user = useAuth();
  const { uid } = user;

  const { data: userInfoData }: any = useQuery({
    queryKey: ['userInfo', uid],
    queryFn: getUserInfoData,
  });

  const {
    userInfo,
    setUserInfo,
    handleNicknameChange,
    validationMessage,
    handleButtonActive,
  } = useUpdateProfile();
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfoData?.photoURL);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  const handleConfirmButtonClick = () => {
    updateUserInfoMutate();
    openModal('login', page + 1);
  };

  useEffect(() => {
    setUserInfo({
      displayName: userInfoData?.displayName,
      photoURL: userInfoData?.photoURL,
      isJunior: userInfoData?.isJunior,
      positions: userInfoData?.positions,
      plannerStack: userInfoData?.plannerStack,
      designerStack: userInfoData?.designerStack,
      developerStack: userInfoData?.developerStack,
    });
  }, [userInfoData]);

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      photoURL: profileImg,
    }));
  }, [profileImg]);

  return (
    <Container>
      <ModalNavigator page={page} back />
      <BodyContainer>
        <TextContainer>
          <SubText>나를 찾는 팀원이 많아지는 방법!</SubText>
          <TitleText>팀원들에게 소개할 프로필을 입력해주세요</TitleText>
        </TextContainer>
        <ProfileContainer>
          <MyPageProfileImage
            profileImg={profileImg}
            onChange={handleProfileImageChange}
            onDelete={handleProfileImageDelete}
            handleButtonActive={handleButtonActive}
            setUserInfo={setUserInfo}
            uid={uid}
          />
          <NicknameContainer>
            <NicknameLabel htmlFor="nickname">닉네임</NicknameLabel>
            <TextInput
              value={userInfo.displayName}
              onChangeValue={handleNicknameChange}
              validationMessage={validationMessage}
            />
          </NicknameContainer>
        </ProfileContainer>
      </BodyContainer>
      <ConfirmButton onClick={handleConfirmButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const BodyContainer = styled.div``;

const TextContainer = styled.div`
  height: 8.3125rem;
  margin-bottom: 1.625rem;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};

  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;

  margin-bottom: 1.3125rem;
`;

const TitleText = styled.h2`
  width: 18rem;

  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2.75rem;

  color: ${COLORS.gray850};

  word-break: keep-all; // 단어 단위로 줄바꿈
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NicknameLabel = styled.label`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #383838;
`;
