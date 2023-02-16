import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
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

export default function ReadOutboxNote({ data }: { data: Note }) {
  const { closeModal } = useGlobalModal();

  // receiver의 프로필 정보
  const { data: receiver } = useQuery({
    queryKey: ['users', data.receiverUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  if (!receiver) return null;
  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={receiver.photoURL} />
        <NameText>{receiver.displayName}님께 보낸 쪽지</NameText>
        <DateText>{getDateAndTime(data.date)}</DateText>
      </HeaderContainer>
      <TitleText>{data.title}</TitleText>
      <ContentText>{data.content}</ContentText>
      <CustomButton label="확인" onClick={closeModal} />
    </Container>
  );
}
