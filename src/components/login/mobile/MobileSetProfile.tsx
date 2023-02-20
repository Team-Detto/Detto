import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import {
  useAuth,
  useGlobalModal,
  useProfileImage,
  useToastPopup,
  useUpdateProfile,
} from 'hooks';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import MobileConfirmButton from './MobileConfirmButton';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../../recoil/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserInfoData, updateUserInfoData } from 'apis/mypageUsers';
import { useEffect } from 'react';
import MyPageProfileImage from 'components/mypage/MyPageProfileImage';
import TextInput from 'components/mypage/TextInput';
import { staleTime } from 'utils/staleTime';
import ValidationToastPopup from 'components/common/ValidationToastPopup';

// 페이지 3 : 프로필 사진, 닉네임 변경
const page = 3;

export default function MobileSetProfile() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();

  const user = useAuth();
  const { uid } = user;

  const { data: userInfoData }: any = useQuery({
    queryKey: ['users', uid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { handleInputChange, validationMessage } = useUpdateProfile();
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfoData?.photoURL);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  // 닉네임  유효성 검사
  const checkValidation = () => {
    const nameLenght = userInfo.displayName.length;
    if (nameLenght < 2 || nameLenght > 7) {
      handleToastPopup('닉네임은 2자 이상 7자 이하로 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleConfirmButtonClick = () => {
    if (!checkValidation()) return;
    updateUserInfoMutate();
    openModal('login', page + 1);
  };

  useEffect(() => {
    setUserInfo({
      displayName: userInfoData?.displayName,
      email: userInfoData?.email,
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
      {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
      <ModalNavigator page={page} back />
      <BodyContainer>
        <div>
          <SubText>나를 찾는 팀원이 많아지는 방법!</SubText>
          <TitleText>팀원들에게 소개할 프로필을 입력해주세요</TitleText>
        </div>
        <ProfileContainer>
          {/* <MyPageProfileImage
            profileImg={profileImg}
            onChange={handleProfileImageChange}
            onDelete={handleProfileImageDelete}
            uid={uid}
          />
          <NicknameContainer>
            <TextInput
              name="displayName"
              value={userInfo.displayName}
              onChangeValue={handleInputChange}
              validationMessage={validationMessage}
            />
          </NicknameContainer> */}
        </ProfileContainer>
      </BodyContainer>
      <MobileConfirmButton onClick={handleConfirmButtonClick} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 1rem;
`;

const BodyContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};

  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
`;

const TitleText = styled.h2`
  width: 10.625rem;

  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;

  color: ${COLORS.gray850};

  word-break: keep-all;
`;

const ProfileContainer = styled.div`
  height: 11.3125rem;

  background-color: ${COLORS.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
