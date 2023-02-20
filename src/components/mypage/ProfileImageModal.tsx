import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  ConfirmAlertBackDrop,
  ConfirmAlertButtonContainer,
  ConfirmAlertCancelButton,
  ConfirmAlertContainer,
  ConfirmALertInfoContainer,
  ConfirmAlertInviteTitle,
  ConfirmAlertSubTitle,
} from 'components/common/ConfirmAlert';
import defaultProfile from 'assets/images/default_profile.jpg';
import COLORS from 'assets/styles/colors';
import { allowScroll, preventScroll } from 'utils/modal';
import { useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState } from '../../recoil/atoms';

interface ProfileImageModalProps {
  isOpen: boolean;
  currentProfile: string;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteEvent: () => void;
  handleModalStateChange: () => void;
}

const ProfileImageModal = ({
  isOpen,
  currentProfile,
  onDeleteEvent,
  onChangeEvent,
  handleModalStateChange,
}: ProfileImageModalProps) => {
  const setActiveInfoBtn = useSetRecoilState(mypageInfoButtonActiveState);
  const imgRef = useRef<HTMLInputElement | null>(null);

  // 프로필 수정 시
  const handleProfileEditClick = () => {
    imgRef.current?.click();
    handleModalStateChange();
    setActiveInfoBtn(true);
  };

  // 프로필 삭제 시
  const handleProfileDeleteClick = () => {
    onDeleteEvent();
    handleModalStateChange();
  };

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <ModalBackDrop isOpen={isOpen}>
      <ModalContainer isOpen={isOpen}>
        <ModalInfoContainer>
          <ModalTitle>프로필을 수정할까요?</ModalTitle>
          <ModalSubTitle>프로필을 수정하거나 삭제할 수 있어요.</ModalSubTitle>
        </ModalInfoContainer>
        <ModalContentContainer>
          <ModalProfileImageBox>
            <ProfileImage
              src={
                currentProfile === '' || currentProfile === undefined
                  ? defaultProfile
                  : currentProfile
              }
              alt="프로필이미지"
            />
            <FileInput
              type="file"
              id="profile"
              ref={imgRef}
              onChange={onChangeEvent}
            />
          </ModalProfileImageBox>
        </ModalContentContainer>
        <ModalButtonContainer>
          <ModalButton onClick={handleProfileDeleteClick}>
            프로필 삭제
          </ModalButton>
          <ModalButton onClick={handleProfileEditClick} isConfirm={true}>
            프로필 수정
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default ProfileImageModal;

const ModalBackDrop = styled(ConfirmAlertBackDrop)``;
const ModalInfoContainer = styled(ConfirmALertInfoContainer)``;
const ModalButtonContainer = styled(ConfirmAlertButtonContainer)``;
const ModalTitle = styled(ConfirmAlertInviteTitle)`
  line-height: 1.75rem;
  font-weight: 600;
`;
const ModalSubTitle = styled(ConfirmAlertSubTitle)``;
const ModalContainer = styled(ConfirmAlertContainer)`
  width: 30.625rem;
  height: 28.5rem;
`;

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const ModalProfileImageBox = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 0;
  margin-bottom: 2.25rem;
  border: 1px solid ${COLORS.gray100};
`;

export const ProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  visibility: hidden;
`;

const ModalButton = styled(ConfirmAlertCancelButton)<{ isConfirm?: boolean }>`
  background-color: ${({ isConfirm }) =>
    isConfirm ? '#6B43DD' : COLORS.gray100};
  color: ${({ isConfirm }) => (isConfirm ? COLORS.white : '#505967')};

  &:hover {
    background-color: ${({ isConfirm }) =>
      isConfirm ? COLORS.violetB400 : COLORS.gray200};
  }
`;
