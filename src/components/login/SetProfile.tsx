import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import {
  useAuth,
  useGlobalModal,
  useProfileImage,
  useUpdateProfile,
} from 'hooks';
import defaultImage from 'assets/images/default_profile.jpg';
import Navigator from './Navigator';
import ConfirmButton from './ConfirmButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserInfoData, updateUserInfoData } from 'apis/mypageUsers';
import { useEffect, useRef } from 'react';

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

  const { userInfo, setUserInfo, handleNicknameChange, validationMessage } =
    useUpdateProfile();
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfoData?.photoURL);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  const imgRef = useRef<HTMLInputElement | null>(null);

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
      <Navigator page={page} back />
      <BodyContainer>
        <TextContainer>
          <SubText>나를 찾는 팀원이 많아지는 방법!</SubText>
          <TitleText>팀원들에게 소개할 프로필을 입력해주세요</TitleText>
        </TextContainer>
        <ProfileContainer>
          <ProfileImageContainer>
            <ProfileImage
              src={profileImg || defaultImage}
              alt="프로필 이미지"
            />
            <FileInput
              type="file"
              id="profile"
              ref={imgRef}
              onChange={handleProfileImageChange}
            />
            <ButtonContainer>
              <Button color="violet" onClick={() => imgRef.current?.click()}>
                수정
              </Button>
              <Button onClick={handleProfileImageDelete}>삭제</Button>
            </ButtonContainer>
          </ProfileImageContainer>
          <NicknameContainer>
            <NicknameLabel htmlFor="nickname">닉네임</NicknameLabel>
            <NicknameInputContainer>
              <NicknameInput
                id="nickname"
                defaultValue={userInfoData?.displayName}
                onChange={handleNicknameChange}
                type="text"
                minLength={2}
                maxLength={30}
              />
              <ValidationMessage>{validationMessage}</ValidationMessage>
            </NicknameInputContainer>
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

const ProfileImageContainer = styled.div`
  width: 8.75rem;
  height: 13.375rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-right: 2.375rem;
`;

const ProfileImage = styled.img`
  width: 8.75rem;
  height: 8.75rem;

  border-radius: 100%;

  object-fit: cover;
`;

const FileInput = styled.input`
  visibility: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ color?: string }>`
  background-color: ${({ color }) =>
    color === 'violet' ? COLORS.violetB400 : COLORS.gray300};
  font-weight: ${({ color }) => (color === 'violet' ? 700 : 400)};

  color: ${COLORS.white};

  padding: 8px 16px;
  gap: 10px;

  width: 3.875rem;
  height: 3rem;

  border-radius: 0.25rem;

  &:hover {
    transform: scale(1.05);
    transition: 100ms ease-in-out;
  }
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

const NicknameInputContainer = styled.div`
  display: flex;
  position: relative;

  margin-left: 1.4375rem;
`;

const NicknameInput = styled.input`
  padding: 10px 20px;

  width: 17.375rem;
  height: 2.75rem;

  background: ${COLORS.white};

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  ::placeholder {
    color: ${COLORS.gray300};
  }
`;

const ValidationMessage = styled.p`
  position: absolute;
  top: 2.75rem;
  font-size: 0.75rem;
  padding-left: 0.25rem;
  color: ${COLORS.red};
`;
