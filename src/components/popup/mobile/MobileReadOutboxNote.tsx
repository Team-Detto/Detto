import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';
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

export default function MobileReadOutboxNote({ data }: { data: Note }) {
  const { closeModal } = useGlobalModal();
  const navigate = useNavigate();

  // receiver의 프로필 정보
  const { data: receiver } = useQuery({
    queryKey: ['users', data.receiverUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const handleProfileImageClick = () => {
    navigate(`/profile/${data.receiverUid}`);
  };

  if (!receiver) return null;
  return (
    <GlobalModalWrapper width="82%" height="26.1875rem" isMobile>
      <MobileContainer>
        <ModalNavigator page={0} close />
        <MobileHeaderContainer>
          <MobileProfileContainer>
            <MobileProfileImage
              src={receiver.photoURL}
              onClick={handleProfileImageClick}
              alt={receiver.displayName + ' 프로필 이미지'}
              referrerPolicy="no-referrer"
            />
            <MobileNameText>
              {receiver.displayName}님께 보낸 쪽지
            </MobileNameText>
          </MobileProfileContainer>
          <MobileDateText>{getDateAndTime(data.date)}</MobileDateText>
        </MobileHeaderContainer>
        <MobileTitleText>{data.title}</MobileTitleText>
        <MobileContentText>{data.content}</MobileContentText>
        <MobileCustomButton label="확인" onClick={closeModal} />
      </MobileContainer>
    </GlobalModalWrapper>
  );
}
