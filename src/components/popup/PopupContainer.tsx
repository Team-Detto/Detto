import styled from '@emotion/styled';
import WebContainer from 'components/common/WebContainer';
import { usePopup } from 'hooks';
import NoteBox from './NoteBox';
import NotificationBox from './NotificationBox';

export default function PopupContainer() {
  const {
    closePopup,
    popup: { isNoteOpen, isNotificationOpen },
  } = usePopup();

  if (!isNoteOpen && !isNotificationOpen) return null;
  return (
    <OutsidePopupWrapper onClick={closePopup}>
      <WebContainer>
        <NoteBox />
        <NotificationBox />
      </WebContainer>
    </OutsidePopupWrapper>
  );
}

const OutsidePopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
