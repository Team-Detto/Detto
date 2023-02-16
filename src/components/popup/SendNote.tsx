import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal, useNote, useToastPopup } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  NameText,
  ProfileImage,
} from './styles';
import { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { staleTime } from 'utils/staleTime';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import ValidationToastPopup from 'components/common/ValidationToastPopup';

export default function SendNote({ data }: { data: Note }) {
  const [disabled, setDisabled] = useState(false);
  const [note, setNote] = useState<SendNote>({ title: '', content: '' });

  const { closeModal } = useGlobalModal();
  const sendNote = useNote();

  const { data: receiver } = useQuery({
    queryKey: ['user', data.senderUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  // 쪽지 유효성 검사
  const checkNoteValidation = useCallback(() => {
    if (!note.title || !note.content) {
      handleToastPopup('제목은 2자 이상, 내용은 5자 이상 입력해주세요.');
      return false;
    }
    if (note.title.length < 2 || note.content.length < 5) {
      handleToastPopup('제목은 2자 이상, 내용은 5자 이상 입력해주세요.');
      return false;
    }
    if (note.title.length > 30 || note.content.length > 500) {
      handleToastPopup('제목은 30자 이하, 내용은 500자 이하 입력해주세요.');
      return false;
    }
    return true;
  }, [note]);

  const handleSendButtonClick = async () => {
    if (!checkNoteValidation()) return;
    setDisabled(true);
    sendNote({ note: note, receiverUid: data.senderUid });
    closeModal();
  };

  if (!receiver) return null;
  return (
    <Container>
      {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
      <ModalNavigator page={0} close />
      <HeaderContainer>
        <ProfileImage src={receiver.photoURL} />
        <NameText>{receiver.displayName}님께 쪽지 보내기</NameText>
      </HeaderContainer>
      <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        autoFocus
        maxLength={30}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <ContentTextarea
        placeholder="내용을 입력해주세요."
        value={note.content}
        maxLength={500}
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
