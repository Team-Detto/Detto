import { useQuery } from '@tanstack/react-query';
import { v4 as uuid } from 'uuid';
import { firestore } from 'apis/firebaseService';
import ModalNavigator from 'components/common/modal/ModalNavigator';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  ProfileImage,
  TitleText,
} from './styles';
import { getUserInfoData } from 'apis/mypageUsers';
import { useState } from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export default function SendNote({ uid }: { uid: string }) {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });
  const [disabled, setDisabled] = useState(false);

  const { closeModal } = useGlobalModal();

  const sender = useAuth();
  const { data: receiver } = useQuery({
    queryKey: ['user', uid],
    queryFn: getUserInfoData,
  });

  const updateNoteCollection = () => {
    if (!receiver) return;
    const noteId = uuid();
    const date = Date.now();

    return Promise.all([
      updateDoc(doc(firestore, `inbox/${receiver.uid}`), {
        [noteId]: {
          uid: sender.uid,
          displayName: receiver.displayName,
          photoURL: receiver.photoURL,
          date,
          title: note.title,
          content: note.content,
          isRead: false,
        },
      }),
      updateDoc(doc(firestore, `outbox/${sender.uid}`), {
        [noteId]: {
          uid: receiver.uid,
          displayName: sender.displayName,
          photoURL: sender.photoURL,
          date,
          title: note.title,
          content: note.content,
          isRead: false,
        },
      }),
    ]);
  };

  const handleSendButtonClick = async () => {
    setDisabled(true);
    await updateNoteCollection();
    closeModal();
  };

  if (!receiver) return null;
  return (
    <Container>
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={receiver.photoURL} />
        <TitleText>{receiver.displayName}님께 쪽지 보내기</TitleText>
      </HeaderContainer>
      <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        autoFocus
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <ContentTextarea
        placeholder="내용을 입력해주세요."
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <CustomButton
        label="쪽지를 보낼게요"
        onClick={handleSendButtonClick}
        disabled={disabled}
      />
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
