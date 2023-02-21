import { useEffect } from 'react';
import { userInfoState } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';
import { useIsMobile, useModal } from 'hooks';
import styled from '@emotion/styled';
import { RiPencilFill } from 'react-icons/ri';
import ProfileImageModal, {
  ModalProfileImageBox,
  ProfileImage,
} from './ProfileImageModal';
import defaultProfile from 'assets/images/default_profile.jpg';
import COLORS from 'assets/styles/colors';

// TODO :: 디폴트 이미지 디자인 나올 경우 파일 경로 수정 필요

interface MyPageProfileImageProps {
  profileImg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  uid: string;
  page?: string;
}

const MyPageProfileImage = ({
  profileImg,
  onChange,
  onDelete,
  page,
}: MyPageProfileImageProps) => {
  const setUserInfo = useSetRecoilState(userInfoState);
  const {
    isOpen: isProfileModalOpen,
    handleModalStateChange: profileModalStateChange,
    handleModalCloseChange: profileModalCloseChange,
  } = useModal(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setUserInfo((prevState) => {
      return {
        ...prevState,
        photoURL: profileImg,
      };
    });
  }, [profileImg]);

  return (
    <ProfileImageWrapper isMobile={isMobile}>
      <ProfileImageBox isMobile={isMobile} type="join">
        <ProfileImage
          src={
            profileImg === '' || profileImg === undefined
              ? defaultProfile
              : profileImg
          }
          alt="프로필이미지"
        />
      </ProfileImageBox>
      <ProfileImgEditButton onClick={profileModalStateChange}>
        <EditIcon />
      </ProfileImgEditButton>

      <ProfileImageModal
        currentProfile={profileImg}
        isOpen={isProfileModalOpen}
        onChangeEvent={onChange}
        onDeleteEvent={onDelete}
        onCloseEvent={profileModalCloseChange}
        handleModalStateChange={profileModalStateChange}
        page={page}
      />
    </ProfileImageWrapper>
  );
};

export default MyPageProfileImage;

const ProfileImageWrapper = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '7.75rem' : '9rem')};
  display: flex;
  margin-right: ${({ isMobile }) => (isMobile ? '0' : '4.625rem')};
  margin: ${({ isMobile }) => (isMobile ? '.875rem auto 0' : '')};

  position: relative;
`;

const ProfileImageBox = styled(ModalProfileImageBox)<{
  isMobile: boolean;
  type?: string;
}>`
  margin-bottom: ${({ type }) => (type === 'join' ? '0' : '1.5rem')};
`;

const ProfileImgEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -0.1875rem;
  bottom: 0.125rem;
  z-index: 1;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${COLORS.violetB300};
  border: 1px solid ${COLORS.white};
  cursor: pointer;
  transform: all 300ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB400};
  }
`;

const EditIcon = styled(RiPencilFill)`
  font-size: 1.5rem;
  color: ${COLORS.white};
`;
