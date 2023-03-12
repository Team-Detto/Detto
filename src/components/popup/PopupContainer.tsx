import styled from '@emotion/styled';
import WebContainer from 'components/common/WebContainer';
import { useIsMobile, usePopup } from 'hooks';
import MobileNoteBox from './mobile/MobileNoteBox';
import MobileNotificationBox from './mobile/MobileNotificationBox';
import NoteBox from './NoteBox';
import NotificationBox from './NotificationBox';

const PopupContainer = () => {
  const {
    closePopup,
    popup: { isNoteOpen, isNotificationOpen },
  } = usePopup();
  const isMobile = useIsMobile();

  if (!isNoteOpen && !isNotificationOpen) return null;

  if (isMobile)
    return (
      <OutsidePopupWrapper onClick={closePopup}>
        <MobileNoteBox />
        <MobileNotificationBox />
      </OutsidePopupWrapper>
    );

  return (
    <OutsidePopupWrapper onClick={closePopup}>
      <WebContainer>
        <NoteBox />
        <NotificationBox />
      </WebContainer>
    </OutsidePopupWrapper>
  );
};

export default PopupContainer;

const OutsidePopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;
