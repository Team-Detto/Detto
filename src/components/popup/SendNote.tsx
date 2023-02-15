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
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

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
      <TitleInput type="text" placeholder="제목을 입력해주세요." autoFocus />
      <ContentTextarea placeholder="내용을 입력해주세요." />
      <CustomButton label="쪽지를 보낼게요" onClick={sendNote} />
    </Container>
  );
}

const TitleInput = styled.input`
  width: 100%;
  padding: 10px 28px;

  font-weight: 400;
  font-size: 18px;

  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;

  resize: none;
`;
