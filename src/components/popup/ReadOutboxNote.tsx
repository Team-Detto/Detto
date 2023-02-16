import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
import { getDateAndTime } from 'utils/date';
import CustomButton from './CustomButton';
import {
  Container,
  ContentText,
  DateText,
  HeaderContainer,
  ProfileImage,
  TitleText,
} from './styles';

export default function ReadOutboxNote({ data }: { data: Note }) {
  const { closeModal } = useGlobalModal();

  const { data: receiver } = useQuery({
    queryKey: ['user', data.receiverUid],
    queryFn: getUserInfoData,
  });

  if (!receiver) return null;
  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={receiver.photoURL} />
        <TitleText>보낸 쪽지</TitleText>
        <DateText>{getDateAndTime(data.date)}</DateText>
      </HeaderContainer>
      <ContentText>{data.content}</ContentText>
      <CustomButton label="확인" onClick={closeModal} />
    </Container>
  );
}
