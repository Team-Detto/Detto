import { useQuery } from '@tanstack/react-query';
import { firestore } from 'apis/firebaseService';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { doc, updateDoc } from 'firebase/firestore';
import { useGlobalModal } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  ProfileImage,
  TitleText,
} from './styles';
import { getUserInfoData } from 'apis/mypageUsers';

export default function SendNote({ uid }: { uid: string }) {
  const { closeModal } = useGlobalModal();

  const { data: user } = useQuery({
    queryKey: ['user', uid],
    queryFn: getUserInfoData,
  });
  const sendNote = () => {
    console.log('쪽지 보내기');
    // updateDoc(doc(firestore, `inbox/${uid}`), {});
  };

  if (!user) return null;
  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={user.photoURL} />
        <TitleText>{user.displayName}님께 쪽지 보내기</TitleText>
      </HeaderContainer>
      <ContentTextarea autoFocus placeholder="쪽지 내용을 입력해주세요." />
      <CustomButton label="쪽지를 보낼게요" onClick={sendNote} />
    </Container>
  );
}
