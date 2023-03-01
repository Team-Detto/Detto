import { useEffect, useRef } from 'react';
import { useIsMobile } from 'hooks';
import styled from '@emotion/styled';
import { CgClose } from 'react-icons/cg';
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

interface ProfileImageModalProps {
  isOpen: boolean;
  currentProfile: string;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteEvent: () => void;
  onCloseEvent: () => void;
  handleModalStateChange: () => void;
  page?: string;
}

const ProfileImageModal = ({
  isOpen,
  currentProfile,
  onDeleteEvent,
  onChangeEvent,
  onCloseEvent,
  handleModalStateChange,
  page,
}: ProfileImageModalProps) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useIsMobile();

  // 프로필 수정 시
  const handleProfileEditClick = () => {
    imgRef.current?.click();
    handleModalStateChange();
  };

  // 프로필 삭제 시
  const handleProfileDeleteClick = () => {
    onDeleteEvent();
    handleModalStateChange();
  };

  useEffect(() => {
    if (isOpen && page !== 'join') {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <ModalBackDrop isOpen={isOpen}>
      <ModalContainer isOpen={isOpen} isMobile={isMobile}>
        <CloseButton onClick={onCloseEvent} />
        <ModalInfoContainer isMobile={isMobile}>
          <ModalTitle>프로필을 수정할까요?</ModalTitle>
          <ModalSubTitle>프로필을 수정하거나 삭제할 수 있어요.</ModalSubTitle>
        </ModalInfoContainer>
        <ModalContentContainer>
          <ModalProfileImageBox isMobile={isMobile}>
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
          <ModalButton onClick={handleProfileDeleteClick} isMobile={isMobile}>
            프로필 삭제
          </ModalButton>
          <ModalButton
            onClick={handleProfileEditClick}
            isConfirm={true}
            isMobile={isMobile}
          >
            프로필 수정
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalBackDrop>
  );
};

export default ProfileImageModal;

const ModalBackDrop = styled(ConfirmAlertBackDrop)`
  overflow-x: hidden;
`;
const ModalInfoContainer = styled(ConfirmALertInfoContainer)<{
  isMobile: boolean;
}>`
  margin-top: ${({ isMobile }) => (isMobile ? '0' : '1.875rem')};
  gap: ${({ isMobile }) => (isMobile ? '0' : '1.5rem')};
  padding: ${({ isMobile }) => (isMobile ? '2rem 0' : '2rem')};

  & > p:first-of-type {
    font-size: ${({ isMobile }) => (isMobile ? '1.125rem' : '2.125rem')};
    margin-bottom: ${({ isMobile }) => (isMobile ? '0' : 'inherit')};
  }

  & > p:nth-of-type(2) {
    font-size: ${({ isMobile }) => (isMobile ? '.875rem' : '1.25rem')};
  }
`;
const ModalButtonContainer = styled(ConfirmAlertButtonContainer)``;

const ModalTitle = styled(ConfirmAlertInviteTitle)`
  line-height: 1.75rem;
  font-weight: 600;
`;
const ModalSubTitle = styled(ConfirmAlertSubTitle)``;
const ModalContainer = styled(ConfirmAlertContainer)<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '20rem' : '38.125rem')};
  height: ${({ isMobile }) => (isMobile ? '23.5rem' : '29rem')};
  position: relative;
`;

const ModalContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

export const ModalProfileImageBox = styled.div<{
  isMobile?: boolean;
  page?: string;
}>`
  width: ${({ isMobile }) => (isMobile ? '7.625rem' : '9rem')};
  height: ${({ isMobile }) => (isMobile ? '7.625rem' : '9rem')};
  margin-bottom: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
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

const ModalButton = styled(ConfirmAlertCancelButton)<{
  isConfirm?: boolean;
  isMobile?: boolean;
}>`
  background-color: ${({ isConfirm }) =>
    isConfirm ? '#6B43DD' : COLORS.gray100};
  color: ${({ isConfirm }) => (isConfirm ? COLORS.white : '#505967')};
  height: ${({ isMobile }) => (isMobile ? '3.25rem' : '3.75rem')};

  &:hover {
    background-color: ${({ isConfirm }) =>
      isConfirm ? COLORS.violetB400 : COLORS.gray200};
  }
`;

const CloseButton = styled(CgClose)`
  font-size: 1.5rem;
  color: ${COLORS.gray700};
  position: absolute;
  top: 2.5rem;
  right: 1.5rem;
  cursor: pointer;
`;
