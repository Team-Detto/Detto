import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { modalTypes } from 'components/common/modal/modalTypes';
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
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';

const ReadInboxNote = ({ data }: { data: Note }) => {
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
    <GlobalModalWrapper width="41.0625rem" height="31.4375rem">
      <Container>
        <ModalNavigator page={0} close />
        <HeaderContainer>
          <ProfileImage
            src={sender.photoURL}
            onClick={handleProfileImageClick}
            alt={sender.displayName + ' 프로필 이미지'}
            referrerPolicy="no-referrer"
          />
          <NameText>{sender.displayName}님께 받은 쪽지</NameText>
          <DateText>{getDateAndTime(data.date)}</DateText>
        </HeaderContainer>
        <TitleText>{data.title}</TitleText>
        <ContentText>{data.content}</ContentText>
        {!sender?.isActive ? (
          <CustomButton
            label="탈퇴한 회원입니다."
            onClick={handleReplyButtonClick}
            color="gray"
            disabled
          />
        ) : (
          <CustomButton label="답장하기" onClick={handleReplyButtonClick} />
        )}
      </Container>
    </GlobalModalWrapper>
  );
};

export default ReadInboxNote;
