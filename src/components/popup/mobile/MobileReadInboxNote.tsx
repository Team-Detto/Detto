import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { modalTypes } from 'components/common/modal/modal';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { getDateAndTime } from 'utils/date';
import { staleTime } from 'utils/staleTime';
import MobileCustomButton from './MobileCustomButton';
import {
  MobileContainer,
  MobileContentText,
  MobileDateText,
  MobileHeaderContainer,
  MobileNameText,
  MobileProfileContainer,
  MobileProfileImage,
  MobileTitleText,
} from './styles';

export default function MobileReadInboxNote({ data }: { data: Note }) {
  const { openModalWithData } = useGlobalModal();
  const navigate = useNavigate();

  // sender의 프로필 정보
  const { data: sender } = useQuery({
    queryKey: ['users', data.senderUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const handleProfileImageClick = () => {
    navigate(`/profile/${data.senderUid}`);
  };

  const handleReplyButtonClick = () => {
    openModalWithData(modalTypes.reply, data);
  };

  if (!sender) return null;
  return (
    <MobileContainer>
      <ModalNavigator page={0} close />
      <MobileHeaderContainer>
        <MobileProfileContainer>
          <MobileProfileImage
            src={sender.photoURL}
            alt={sender.displayName + ' 프로필 이미지'}
            onClick={handleProfileImageClick}
            referrerPolicy="no-referrer"
          />
          <MobileNameText>{sender.displayName}님께 받은 쪽지</MobileNameText>
        </MobileProfileContainer>
        <MobileDateText>{getDateAndTime(data.date)}</MobileDateText>
      </MobileHeaderContainer>
      <MobileTitleText>{data.title}</MobileTitleText>
      <MobileContentText>{data.content}</MobileContentText>
      {!sender?.isActive ? (
        <MobileCustomButton
          label="탈퇴한 회원입니다."
          onClick={handleReplyButtonClick}
          color="gray"
          disabled
        />
      ) : (
        <MobileCustomButton label="답장하기" onClick={handleReplyButtonClick} />
      )}
    </MobileContainer>
  );
}
