import { popupState } from './../recoil/atoms';
import { useRecoilState } from 'recoil';
const usePopup = () => {
  const [popup, setPopup] = useRecoilState(popupState);

  // 쪽지함 토글 (알림함이 열려있으면 닫기)
  const toggleNoteBox = () => {
    setPopup({
      isNoteOpen: !popup.isNoteOpen,
      isNotificationOpen: false,
    });
  };

  // 알림함 토글 (쪽지함이 열려있으면 닫기)
  const toggleNotificationBox = () => {
    setPopup({
      isNoteOpen: false,
      isNotificationOpen: !popup.isNotificationOpen,
    });
  };

  // 팝업 닫기 (페이지 이동 시 모든 팝업을 닫기 위한 목적)
  const closePopup = () => {
    setPopup({
      isNoteOpen: false,
      isNotificationOpen: false,
    });
  };

  return {
    popup,
    closePopup,
    toggleNoteBox,
    toggleNotificationBox,
  };
};

export default usePopup;
