import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { getDateAndTime } from 'utils/date';
import { staleTime } from 'utils/staleTime';
import CustomButton from './CustomButton';
import {
  Container,
  ContentText,
  DateText,
  HeaderContainer,
  NameText,
  ProfileImage,
  TitleText,
} from './styles';

const ReadOutboxNote = ({ data }: { data: Note }) => {
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
    <GlobalModalWrapper width="41.0625rem" height="31.4375rem">
      <Container>
        <ModalNavigator page={0} close />
        <HeaderContainer>
          <ProfileImage
            src={receiver.photoURL}
            onClick={handleProfileImageClick}
            alt={receiver.displayName + ' 프로필 이미지'}
            referrerPolicy="no-referrer"
          />
          <NameText>{receiver.displayName}님께 보낸 쪽지</NameText>
          <DateText>{getDateAndTime(data.date)}</DateText>
        </HeaderContainer>
        <TitleText>{data.title}</TitleText>
        <ContentText>{data.content}</ContentText>
        <CustomButton label="확인" onClick={closeModal} />
      </Container>
    </GlobalModalWrapper>
  );
};

export default ReadOutboxNote;
