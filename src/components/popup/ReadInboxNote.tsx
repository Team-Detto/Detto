import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { modalTypes } from 'components/common/modal/modal';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
import { getDateAndTime } from 'utils/date';
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

export default function ReadInboxNote({ data }: { data: Note }) {
  const { openModalWithData } = useGlobalModal();

  const { data: sender } = useQuery({
    queryKey: ['user', data.senderUid],
    queryFn: getUserInfoData,
  });

  const handleReplyButtonClick = () => {
    openModalWithData(modalTypes.reply, data);
  };

  if (!sender) return null;
  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={sender.photoURL} />
        <NameText>{sender.displayName}님께 받은 쪽지</NameText>
        <DateText>{getDateAndTime(data.date)}</DateText>
      </HeaderContainer>
      <TitleText>{data.title}</TitleText>
      <ContentText>{data.content}</ContentText>
      <CustomButton label="답장하기" onClick={handleReplyButtonClick} />
    </Container>
  );
}
