import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal, useNote } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  ProfileImage,
  TitleText,
} from './styles';
import { useState } from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export default function SendNote({ receiverUid }: { receiverUid: string }) {
  const [disabled, setDisabled] = useState(false);

  const { closeModal } = useGlobalModal();
  const { sendNote, receiver, note, setNote } = useNote(receiverUid);

  const handleSendButtonClick = async () => {
    setDisabled(true);
    sendNote();
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
