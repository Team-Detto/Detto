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
  ProfileImage,
  TitleText,
} from './styles';

export default function ReadInboxNote({ data }: { data: Note }) {
  const { openModalWithData } = useGlobalModal();

  const handleReplyButtonClick = () => {
    openModalWithData(modalTypes.reply, data);
  };

  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={data.senderPhotoURL} />
        <TitleText>{data.title}</TitleText>
        <DateText>{getDateAndTime(data.date)}</DateText>
        {/* <DateText>{data.senderDisplayName}</DateText> */}
      </HeaderContainer>
      <ContentText>{data.content}</ContentText>
      <CustomButton label="답장하기" onClick={handleReplyButtonClick} />
    </Container>
  );
}
