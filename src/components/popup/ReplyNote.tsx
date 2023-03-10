import ModalNavigator from 'components/common/modal/ModalNavigator';
import { useGlobalModal, useModal, useNote } from 'hooks';
import CustomButton from './CustomButton';
import {
  Container,
  ContentTextarea,
  HeaderContainer,
  NameText,
  ProfileImage,
} from './styles';
import { useState } from 'react';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { staleTime } from 'utils/staleTime';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import Alert from 'components/common/Alert';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import { GlobalModalWrapper } from 'components/common/modal/GlobalModal';

const ReplyNote = ({ data }: { data: Note }) => {
  const [disabled, setDisabled] = useState(false);
  const [note, setNote] = useState<SendNote>({ title: '', content: '' });
  const { closeModal } = useGlobalModal();
  const { sendNote, checkNoteValidation, showToast, ToastMessage } = useNote();

  const { data: receiver } = useQuery({
    queryKey: ['user', data?.senderUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);

  const handleSendButtonClick = () => {
    if (!checkNoteValidation(note)) return;
    sendNote({ note: note, receiverUid: data.senderUid });
    setDisabled(true);
    onAlertClickEvent(); //alert창 띄우기
    amplitudeToNoneButtonClick('reply_note'); // 쪽지 보내기 이벤트 로깅
  };

  const handleAlertButtonClick = () => {
    onAlertClickEvent();
    closeModal();
  };

  if (!receiver) return null;

  return (
    <GlobalModalWrapper width="41.0625rem" height="31.4375rem">
      <Container>
        {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
        <ModalNavigator page={0} close />
        <HeaderContainer>
          <ProfileImage
            src={receiver.photoURL}
            alt={receiver.displayName + ' 프로필 이미지'}
            referrerPolicy="no-referrer"
          />
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
          onClick={() => {
            handleSendButtonClick();
          }}
          disabled={disabled}
        />
      </Container>

      <Alert
        isOpen={isAlertOpen}
        onClickEvent={handleAlertButtonClick}
        mainMsg="쪽지를 보냈어요!"
        subMsg="보낸 쪽지함에서 확인해보세요."
        page="sendNote"
      />
    </GlobalModalWrapper>
  );
};

export default ReplyNote;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px 28px;
  font-weight: 400;
  font-size: 18px;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  resize: none;
`;
