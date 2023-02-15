import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  ProfileImage,
  TitleText,
} from './styles';

export default function SendNote({ data }: { data: Note }) {
  const { closeModal } = useGlobalModal();

  const sendNote = () => {
    console.log('쪽지 보내기');
    // updateDoc(doc(firestore, `inbox/${uid}`), {});
    closeModal();
  };

  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={data.photoURL} />
        <TitleText>{data.displayName}님께 쪽지 보내기</TitleText>
      </HeaderContainer>
      <ContentTextarea autoFocus placeholder="쪽지 내용을 입력해주세요." />
      <CustomButton label="쪽지를 보낼게요" onClick={sendNote} />
    </Container>
  );
}
