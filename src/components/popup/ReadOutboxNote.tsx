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

  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={data.receiverPhotoURL} />
        <TitleText>보낸 쪽지</TitleText>
        <DateText>{getDateAndTime(data.date)}</DateText>
      </HeaderContainer>
      <ContentText>{data.content}</ContentText>
      <CustomButton label="확인" onClick={closeModal} />
    </Container>
  );
}
