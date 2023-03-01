import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal, useNote } from 'hooks';
import { useState } from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { staleTime } from 'utils/staleTime';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import MobileCustomButton from './MobileCustomButton';
import {
  MobileContainer,
  MobileContentTextarea,
  MobileNameText,
  MobileProfileImage,
} from './styles';

export default function MobileReplyNote({ data }: { data: Note }) {
  const [disabled, setDisabled] = useState(false);
  const [note, setNote] = useState<SendNote>({ title: '', content: '' });
  const [isSent, setIsSent] = useState(false);
  const { closeModal } = useGlobalModal();
  const {
    sendNote,
    checkNoteValidation,
    showToast,
    ToastMessage,
    handleToastPopup,
  } = useNote();

  const { data: receiver } = useQuery({
    queryKey: ['user', data?.senderUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const handleSendButtonClick = () => {
    if (!checkNoteValidation(note)) return;
    sendNote({ note: note, receiverUid: data.senderUid });
    setDisabled(true);
    handleToastPopup('쪽지가 전송되었습니다.');
    setIsSent(true);
    setTimeout(closeModal, 2000);
  };

  if (!receiver) return null;

  return (
    <MobileContainer>
      {showToast && (
        <ValidationToastPopup message={ToastMessage} top={2} isCheck={isSent} />
      )}
      <ModalNavigator page={0} close />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <MobileProfileImage
          src={receiver.photoURL}
          referrerPolicy="no-referrer"
        />
        <MobileNameText>{receiver.displayName}님께 쪽지 보내기</MobileNameText>
      </div>
      <TitleInput
        type="text"
        placeholder="제목을 입력해주세요."
        autoFocus
        maxLength={30}
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <div style={{ position: 'relative' }}>
        <MobileContentTextarea
          placeholder="내용을 입력해주세요."
          value={note.content}
          maxLength={500}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <ContentCharCount>
          <Count length={note.content.length}>{note.content.length}</Count>/500
        </ContentCharCount>
      </div>
      <MobileCustomButton
        label="쪽지를 보낼게요"
        onClick={handleSendButtonClick}
        disabled={disabled}
      />
    </MobileContainer>
  );
}

const TitleInput = styled.input`
  width: 100%;
  padding: 0.625rem 1.25rem;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  border: 1px solid ${COLORS.gray300};
  border-radius: 0.25rem;
`;

const ContentCharCount = styled.span`
  position: absolute;
  bottom: 0.6rem;
  right: 0.5625rem;

  font-weight: 350;
  font-size: 0.8125rem;

  color: ${COLORS.gray700};
`;

const Count = styled.span<{ length?: number }>`
  color: ${({ length }) =>
    length
      ? length < 10
        ? COLORS.gray700
        : COLORS.violetA500
      : COLORS.gray700};
`;
