import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import {
  useAuth,
  useGlobalModal,
  useProfileImage,
  useToastPopup,
  useUpdateProfile,
} from 'hooks';
import ModalNavigator from '../common/modal/ModalNavigator';
import ConfirmButton from './ConfirmButton';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getUserInfoData, updateUserInfoData } from 'apis/mypageUsers';
import { useEffect } from 'react';
import MyPageProfileImage from 'components/mypage/MyPageProfileImage';
import TextInput from 'components/mypage/TextInput';
import { staleTime } from 'utils/staleTime';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { DocumentData } from 'firebase/firestore';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';


// 페이지 3 : 프로필 사진, 닉네임 변경
const page = 3;

const SetProfile = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();

  const { uid } = useAuth();

  const { data: userInfoData }: DocumentData = useQuery({
    queryKey: ['users', uid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { handleInputChange, validationMessage, handleInputClear } =
    useUpdateProfile();
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfoData?.photoURL);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  // 닉네임  유효성 검사
  const checkValidation = () => {
    const nameLength = userInfo.displayName.length;
    if (nameLength < 2 || nameLength > 7) {
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
    <GlobalModalWrapper width="42rem" height="30.625rem">
      <Container>
        {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
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
              uid={uid}
              page="join"
            />
            <NicknameContainer>
              <NicknameLabel htmlFor="nickname">닉네임</NicknameLabel>
              <TextInput
                name="displayName"
                value={userInfo.displayName}
                onChangeValue={handleInputChange}
                onClearValue={handleInputClear}
                validationMessage={validationMessage}
              />
            </NicknameContainer>
          </ProfileContainer>
        </BodyContainer>
        <ConfirmButton onClick={handleConfirmButtonClick} />
      </Container>
    </GlobalModalWrapper>
  );
};

export default SetProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 2.5rem;
`;

const BodyContainer = styled.div`
  margin-top: 1.25rem;
`;

const TextContainer = styled.div`
  margin-bottom: 1.75rem;
`;

const SubText = styled.h3`
  color: ${COLORS.gray750};

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4375rem;

  margin-bottom: 0.5rem;
`;

const TitleText = styled.h2`
  width: 15rem;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 140%;

  color: ${COLORS.gray850};

  word-break: keep-all; // 단어 단위로 줄바꿈
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  margin-bottom: 2rem;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-left: 1.8125rem;
`;

const NicknameLabel = styled.label`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.75rem;
  width: 4.9375rem;

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  color: #383838;
`;
